<template>
    <div class="uploader-root">
        <form
            class="uploader-form"
            enctype="multipart/form-data"
            novalidate
        >
            <b-spinner v-if="isUploading" variant="success" label="Spinning"></b-spinner>
            <label v-else class="btn btn-outline-primary">
                {{ loadBtnText }}
                <input
                    :name="uploadFieldName"
                    @click="onClick($event)"
                    @change="onChange($event.target.files)"
                    multiple
                    type="file"
                    :accept="accept"
                    class="images-upload-input"
                />
        </label>
        </form>
    </div>
</template>

<script>
import when from 'when';
import Pica from 'pica/dist/pica';

const pica = Pica({features: [ 'js', 'wasm', 'ww', 'cib' ]});

const DEFAULT_PREVIEW_FORMAT = {
    width: 100,
    height: 52
}

export default {
    name: 'ImageUploader',
    data() {
        return {
            files: [],
            accept: 'image/jpeg, image/png, image/gif',
            imagesCount: 0,
            isUploading: false
        }
    },
    props: {
        currentImageId: {type: String}, /* image id to replace */
        num: {
            type: Number,
            default: 0
        },
        loadBtnText: {
            type: String,
            default: 'Upload image'
        },
        previewFormat: {
            type: Object,
            default: () => DEFAULT_PREVIEW_FORMAT
        }
    },
    computed: {
        uploadFieldName () {
            return 'file-' + this.num;
        },
        inputId () {
            return 'images-upload-' + this.num;
        }
    },
    mounted () {
        this.canvasResized = document.createElement('canvas');
    },
    beforeDestroy () {
        this.canvasResized.remove();
    },
    methods: {
        onChange (files) {
            if (!files.length) return;
            this.imagesCount = files.length;
            this.files = files;

            this.isUploading = true;

            const uploadMultipleFiles = (index) => {
                const file = files[index];

                this.resizeImageAndConvertToBase64(file);
            }

            return when.iterate(
                index => index + 1,
                index => index === this.imagesCount,
                uploadMultipleFiles,
                0
            ).then(_ => {
                /* TODO */
            }).catch(error => {
                throw new Error('Uploader onChange when.iterate error: ' + error.message);
            }).finally(_ => {
                this.isUploading = false;
            });
        },
        setCanvasWidthHeight (w, h) {
            this.canvasResized.width = w;
            this.canvasResized.height = h;
        },
        resizeImageAndConvertToBase64 (file) {
            const vm = this;

            const heightResize = this.previewFormat.height;
            const image = new Image();
            image.src = window.URL.createObjectURL(file);

            image.onload = function () {
                let k = heightResize / this.naturalHeight;
                vm.setCanvasWidthHeight(Math.floor(this.naturalWidth * k), heightResize);
                pica.resize(this, vm.canvasResized, {}).then(_ => {
                    let base64 = vm.canvasResized.toDataURL();
                    vm.$emit('image-uploaded', {
                        num: vm.num,
                        base64
                    });
                })
            };
        },
        onClick (e) {
            this.$emit('click', e);
        }
    }
}
</script>

<style>
.images-upload-input {
    display: none;
}
</style>

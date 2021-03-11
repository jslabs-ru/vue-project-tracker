<template>
    <form
        class="uploader-form"
        enctype="multipart/form-data"
        novalidate
    >
        <b-spinner v-if="isUploading"
            variant="success"
            label="Spinning">
        </b-spinner>

        <label v-else class="btn btn-outline-primary">
            {{ loadBtnText }}
            <input
                :name="uploadFieldName"
                @change="onChange($event.target.files)"
                type="file"
                :accept="accept"
                class="images-upload-input"
            />
        </label>
    </form>
</template>

<script>
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
            const file = files[0];

            this.isUploading = true;

            this.resizeImageAndConvertToBase64(file).then(base64 => {
                this.isUploading = false;
                this.$emit('image-uploaded', {
                    num: this.num,
                    base64
                });
            });
        },
        setCanvasDimensions (w, h) {
            this.canvasResized.width = w;
            this.canvasResized.height = h;
        },
        resizeImageAndConvertToBase64 (file) {
            return new Promise((resolve, reject) => {
                const heightResize = this.previewFormat.height;
                const image = new Image();
                image.src = window.URL.createObjectURL(file);

                image.onload = () => {
                    let k = heightResize / image.naturalHeight;
                    this.setCanvasDimensions(Math.floor(image.naturalWidth * k), heightResize);
                    pica.resize(image, this.canvasResized, {}).then(_ => {
                        resolve(this.canvasResized.toDataURL()); /* image in base64 formatted: see canvas.toDataURL() method */
                    });
                };
            })
        }
    }
}
</script>

<style>
.images-upload-input {
    display: none;
}
</style>

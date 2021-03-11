<template>
    <div>
        <form
            @submit.prevent="onSave"
        >
                <div class="form-group">
                    <label for="project-name">Project</label>
                    <input
                        type="text"
                        class="form-control"
                        id="project-name"
                        autocomplete="off"
                        v-model="projectName"
                        @input="$v.projectName.$touch"
                    />
                    <div>
                        <div
                            class="alert alert-danger"
                            role="alert"
                            v-if="$v.projectName.$dirty && !$v.projectName.required"
                        >Name should not be empty</div>
                        <div
                            class="alert alert-danger"
                            role="alert"
                            v-if="$v.projectName.$dirty && !$v.projectName.isAlphabetic"
                        >Use only english characters</div>
                        <div
                            class="alert alert-danger"
                            role="alert"
                            v-if="!$v.projectName.minLength"
                        >Name length should be at least {{ defaultNameLength }}</div>
                        <div
                            class="alert alert-danger"
                            role="alert"
                            v-if="!$v.projectName.maxLength"
                        >Too long project name, should be 15 </div>
                    </div>
                </div>


                <div class="form-group">
                    <label for="project-description">Description</span></label>
                    <textarea
                        class="form-control"
                        id="project-description"
                        v-model="projectDescription"
                        @input="$v.projectDescription.$touch"
                    />

                    <div
                        class="alert alert-danger"
                        role="alert"
                        v-if="$v.projectDescription.$dirty && !$v.projectDescription.required"
                    >Description should not be empty</div>
                </div>

                <!-- <pre class="card">
                    {{ valObject }}
                </pre> -->

                <div class="form-group" v-if="projectBase64">
                    <img :src="projectBase64" class="preview-image" />
                </div>

                <div class="form-group">
                    <ImageUploader
                        loadBtnText="Upload project logo"
                        :previewFormat="{width: 200, height: 104}"
                        @image-uploaded="onLogoUploaded"
                    />

                    <div
                        class="alert alert-danger"
                        role="alert"
                        v-if="$v.projectBase64.$dirty && !$v.projectBase64.isBase64Format"
                    >Image should be in base64 format</div>
                </div>

                <div class="form-group">
                    <datepicker
                        placeholder="Выберите дату"
                        name="datepicker"
                        id="article-date"

                        v-model="projectDate"
                        @selected="onDateSelected"
                    ></datepicker>
                </div>

                <div>
                    <div
                        class="alert alert-danger"
                        role="alert"
                        v-if="$v.projectDate.$dirty && !$v.projectDate.required"
                    >Date should not be empty</div>
                    <div
                        class="alert alert-danger"
                        role="alert"
                        v-if="$v.projectDate.$dirty && !$v.projectDate.isAfterCurrentTimestamp"
                    >Date should not be in future</div>
                </div>

                <div>{{ submitStatus }}</div>

                <div class="form-group">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        v-on:submit="onSave"
                    >Save</button>
                </div>
        </form>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import isBase64 from 'is-base64';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import ImageUploader from '@/components/images/ImageUploader';

import ProjectService from '@/services/projectService';

const DEFAULT_NAME_LENGTH = 4;
const DEFAULT_NAME_MAX_LENGTH = 15;

export default {
    name: 'ProjectForm',
    data () {
        return {
            defaultNameLength: DEFAULT_NAME_LENGTH,
            projectName: '',
            projectDescription: '',
            projectDate: '',
            projectBase64: null,
            projectTimestamp: null,
            submitStatus: ''
        }
    },
    components: {
        Datepicker,
        ImageUploader
    },
    validations: {
        projectName: {
            required,
            isAlphabetic: function(val) {
                return val.match(/^[A-Za-z]+$/) ? true : false;
            },
            minLength: minLength(DEFAULT_NAME_LENGTH),
            maxLength: maxLength(DEFAULT_NAME_MAX_LENGTH),
        },
        projectDescription: {
            required
        },
        projectBase64: {
            isBase64Format: function(val) {
                return isBase64(val, {mimeRequired: true}) ? true : false;
            }
        },
        projectDate: {
            required,
            isAfterCurrentTimestamp: function(val) {
                let timestamp = this.toUnixTimestamp(val);
                let currentTimestamp = moment().unix();
                return timestamp > currentTimestamp ? false : true;
            }
        }
    },
    computed: {
        valObject () {
            return JSON.stringify(this.$v, null, 2)
        }
    },
    methods: {
        toUnixTimestamp (val) {
            return moment(val).unix()
        },
        onDateSelected (val) {
            this.$v.projectDate.$touch();
            this.projectTimestamp = this.toUnixTimestamp(val);
        },
        onLogoUploaded (base64Payload) {
            const { num, base64 } = base64Payload;
            this.projectBase64 = base64;
            this.$v.projectBase64.$touch();
        },
        onSave () {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR';
            } else {
                this.submitStatus = 'PENDING';

                ProjectService.createProject({
                    name: this.$v.projectName.$model,
                    description: this.$v.projectDescription.$model,
                    logo: this.$v.projectBase64.$model,
                    created_at: this.toUnixTimestamp(this.$v.projectDate.$model)
                }).then(res => {
                    this.submitStatus = 'OK';
                    this.$eventBus.$emit('project-created');
                }).catch(error => {
                    this.submitStatus = 'SERVER ERROR: ' + error.response.data.error;
                })
            }
        }
    }
}
</script>

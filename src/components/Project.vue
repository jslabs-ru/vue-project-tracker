<template>
    <div>
        <form
            @submit.prevent="onSave"
        >
                <div class="form-group">
                    <label for="project-name">Project timestamp: <span class="red">{{ projectTimestamp }}</span></label>
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
                            v-if="!$v.projectName.minLength"
                        >Name length should be at least {{ defaultNameLength }}</div>
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

                <datepicker
                    placeholder="Выберите дату"
                    name="datepicker"
                    id="article-date"

                    v-model="projectDate"
                    @selected="onDateSelected"
                ></datepicker>

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

                <button
                    type="submit"
                    class="btn btn-primary"
                    v-on:submit="onSave"
                >Save</button>
        </form>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import { required, minLength } from 'vuelidate/lib/validators';

import ProjectService from '@/services/projectService';

const DEFAULT_NAME_LENGTH = 4;

export default {
    name: 'Project',
    data () {
        return {
            defaultNameLength: DEFAULT_NAME_LENGTH,
            projectName: '',
            projectDescription: '',
            projectDate: '',
            projectTimestamp: null,
            submitStatus: ''
        }
    },
    components: {
        Datepicker
    },
    validations: {
        projectName: {
            required,
            minLength: minLength(DEFAULT_NAME_LENGTH)
        },
        projectDescription: {
            required
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
        onSave () {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR';
            } else {
                this.submitStatus = 'PENDING';

                ProjectService.createProject({
                    name: this.$v.projectName.$model,
                    description: this.$v.projectDescription.$model,
                    created_at: this.toUnixTimestamp(this.$v.projectDate.$model)
                }).then(res => {
                    this.submitStatus = 'OK';
                }).catch(error => {
                    this.submitStatus = 'SERVER ERROR: ' + error.response.data.error;
                })
            }
        }
    }
}
</script>

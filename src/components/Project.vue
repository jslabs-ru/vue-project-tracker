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

                <!-- <pre class="card">
                    {{ valObject }}
                </pre> -->

                <datepicker
                    placeholder="Выберите дату"
                    name="datepicker"
                    id="article-date"

                    v-model="dateModel"
                    @selected="onDateSelected"
                ></datepicker>

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

const DEFAULT_NAME_LENGTH = 4;

export default {
    name: 'Project',
    data () {
        return {
            defaultNameLength: DEFAULT_NAME_LENGTH,
            projectName: '',
            projectDate: '2021-03-03',
            projectTimestamp: null,
        }
    },
    components: {
        Datepicker
    },
    validations: {
        projectName: {
            required,
            minLength: minLength(DEFAULT_NAME_LENGTH)
        }
    },
    computed: {
        valObject () {
            return JSON.stringify(this.$v, null, 2)
        },
        dateModel: {
            get () {
                return this.projectName;
            },
            set (val) {
                this.projectDate = val;
            }
        }
    },
    methods: {
        toUnixTimestamp (val) {
            return moment(val).unix()
        },
        onDateSelected (val) {
            this.projectTimestamp = this.toUnixTimestamp(val);
        },
        onSave () {
            console.log(this.$v.projectName.$model);
        }
    }
}
</script>

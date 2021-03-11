<template>
    <div class="root-page">
        <div class="row">
            <div class="col">
                <b-spinner
                    v-if="isLoading"
                    variant="primary"
                    label="Spinning"
                ></b-spinner>

                <b-table
                    :busy="isLoading"
                    id="projects-table"
                    :fields="fields"
                    :items="items"
                    @row-clicked="onRowClick"
                    bordered
                >
                </b-table>

                <button
                    type="submit"
                    class="btn btn-primary"
                    @click="createProject"
                >Create new project</button>
            </div>
            <div class="col">
                <RouterView name="project" />
            </div>
        </div>
    </div>
</template>

<script>
import { isUndefined, isFinite } from 'lodash';
import ProjectService from '@/services/projectService';

export default {
    data () {
        return {
            isLoading: true,
            fields: [
                { key: 'name', label: 'Project Name' }
            ],
            items: []
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    },
    created () {
        ProjectService.getAll().then(projects => {
            this.items = projects;
            this.isLoading = false;
        })
    },
    methods: {
        onRowClick (item) {
            this.$router.push({path: `/users/${item.userid}`}, () => {});
        },
        createProject () {
            this.$router.push({path: '/projects/create'}, () => {})
        }
    }
}
</script>

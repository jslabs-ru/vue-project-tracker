<template>
    <div class="root-page container">
        <div class="row">
            <div class="cell">
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
                >
                </b-table>
            </div>
            <div class="cell">
                Current Project
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
        }
    }
}
</script>

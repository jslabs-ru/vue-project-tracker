<template>
    <div>
        <b-spinner
            v-if="isLoading"
            variant="primary"
            label="Spinning"
        ></b-spinner>

        <b-card
            v-else
            style="max-width: 20rem;"
            class="mb-2"
        >
            <template #header>
                <b-card-title>project.name</b-card-title>
            </template>

            <b-card-body>
                <b-card-text>
                    {{ project.description }}
                </b-card-text>
            </b-card-body>

            <template #footer>
                <div class="sub-title"><span class="sub-title-label">Created at:</span> {{ project.created_at }}</div>
                <div class="sub-title"><span class="sub-title-label">Updated at:</span> {{ project.updated_at }}</div>
            </template>
        </b-card>
    </div>
</template>

<script>
import ProjectService from '@/services/projectService';

const DEFAULT_NAME_LENGTH = 4;

export default {
    name: 'Project',
    data () {
        return {
            isLoading: true,
            project: null
        }
    },
    created () {
        ProjectService.getProjectById(this.$route.params.id).then(project => {
            this.isLoading = false;
            this.project = project;
        })
    }
}
</script>

<style>
.sub-title {
    font-size: 12px;
    font-style: italic;
}
.sub-title-label {
    font-weight: bold;
}
</style>

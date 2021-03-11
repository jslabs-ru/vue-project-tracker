<template>
    <pre>
        {{ project }}
    </pre>
</template>

<script>
import ProjectService from '@/services/projectService';

const DEFAULT_NAME_LENGTH = 4;

export default {
    name: 'Project',
    data () {
        return {
            project: null
        }
    },
    created () {
        ProjectService.getProjectById(this.$route.params.id).then(project => {
            this.project = project;
        })
    }
}
</script>

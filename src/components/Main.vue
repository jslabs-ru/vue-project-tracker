<template>
    <div>
        <button
            type="submit"
            class="btn btn-primary"
            @click="createProject"
        >Create project</button>
    </div>
</template>

<script>
export default {
    name: 'Home',
    methods: {
        createProject () {
            this.$router.push({path: '/project/1'}, () => {})
        }
    }
}
</script>

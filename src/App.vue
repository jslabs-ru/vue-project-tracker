<template>
    <b-container>
        <Tasks />
    </b-container>
</template>

<script>
import Vue from 'vue';

import Tasks from '@/components/Tasks.vue';

export default {
    name: 'App',
    components: {
        Tasks
    }
}
</script>

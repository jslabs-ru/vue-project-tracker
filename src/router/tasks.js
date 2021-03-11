import TaskAutocomplete from '@/components/TaskAutocomplete.vue';

const Tasks = () =>
    import(
        /* webpackChunkName: "tasks" */
        '@/components/Tasks.vue'
    );

export default [
    {
        path: '/tasks',
        components: {
            default: Tasks
        }
    },
    {
        path: '/tasks/autocomplete',
        components: {
            default: TaskAutocomplete
        }
    }
]

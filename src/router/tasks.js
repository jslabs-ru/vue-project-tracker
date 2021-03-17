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
        },
        meta: {
            title: 'Tasks'
        }
    }
]

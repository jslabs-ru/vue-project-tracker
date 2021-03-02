import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '@/components/Main.vue';
const Tasks = () =>
    import(
        /* webpackChunkName: "tasks" */
        '@/components/Tasks.vue'
    );

import NotFound from '@/components/NotFound.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        components: {
            default: Main
        }
    },
    {
        path: '/tasks',
        components: {
            default: Tasks
        }
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;

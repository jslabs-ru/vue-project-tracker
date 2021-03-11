import Vue from 'vue';
import { union } from 'lodash';
import VueRouter from 'vue-router';

import projectsRoutes from '@/router/projects';
import usersRoutes from '@/router/users';
import tasksRoutes from '@/router/tasks';

import Main from '@/components/Main.vue';

import NotFound from '@/components/NotFound.vue';

Vue.use(VueRouter);

const baseRoutes = [
    {
        path: '/',
        components: {
            default: Main
        }
    },
    {
        path: '*',
        component: NotFound
    }
]

const routes = union(
    projectsRoutes,
    usersRoutes,
    tasksRoutes,
    baseRoutes
);

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;

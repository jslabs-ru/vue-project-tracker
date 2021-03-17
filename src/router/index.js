import Vue from 'vue';
import { union } from 'lodash';
import VueRouter from 'vue-router';

import projectsRoutes from '@/router/projects';
import usersRoutes from '@/router/users';
import tasksRoutes from '@/router/tasks';
import baseRoutes from '@/router/base';

import beforeEach from '@/router/hooks/beforeEach';

Vue.use(VueRouter);

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

router.beforeEach(beforeEach);

export default router;

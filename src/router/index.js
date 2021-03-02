import Vue from 'vue';
import VueRouter from 'vue-router';
import ObjectID from 'bson-objectid';

import Main from '@/components/Main.vue';

const Tasks = () =>
    import(
        /* webpackChunkName: "tasks" */
        '@/components/Tasks.vue'
    );

const Users = () =>
    import(
        /* webpackChunkName: "users" */
        '@/components/Users.vue'
    );

const Project = () =>
    import(
        /* webpackChunkName: "project" */
        '@/components/Project.vue'
    );

import UserData from '@/components/UserData.vue';

import NotFound from '@/components/NotFound.vue';

Vue.use(VueRouter);

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

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
        path: '/users',
        components: {
            default: Users
        }
    },
    {
        path: '/users/:userid',
        components: {
            default: UserData
        }
    },
    {
        path: '/project/:id',
        components: {
            default: Project
        },
        beforeEnter: (to, from, next) => {
            if(to.params.id.match(OBJECT_ID_REGEX)) {
                next();
            } else {
                let newId = ObjectID();
                next({ path: `/project/${newId}` });
            }
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

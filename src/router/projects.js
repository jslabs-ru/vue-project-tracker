import ObjectID from 'bson-objectid';
import Projects from '@/components/Projects.vue';

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

const Project = () =>
    import(
        /* webpackChunkName: "project" */
        '@/components/Project.vue'
    );

export default [
    {
        path: '/projects',
        components: {
            default: Projects
        },
        children: [
            {
                path: 'create',
                components: {
                    project: Project
                }
            }
        ]
    },
    // {
    //     path: '/projects/:id',
    //     components: {
    //         default: Project
    //     },
    //     beforeEnter: (to, from, next) => {
    //         if(to.params.id.match(OBJECT_ID_REGEX)) {
    //             next();
    //         } else {
    //             let newId = ObjectID();
    //             next({ path: `/projects/${newId}` });
    //         }
    //     }
    // },
]

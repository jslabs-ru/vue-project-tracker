import ObjectID from 'bson-objectid';
const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

const Project = () =>
    import(
        /* webpackChunkName: "project" */
        '@/components/Project.vue'
    );

export default [
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
]

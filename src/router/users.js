const Users = () =>
    import(
        /* webpackChunkName: "users" */
        '@/components/Users.vue'
    );

const UserData = () =>
    import(
        /* webpackChunkName: "user-data" */
        '@/components/UserData.vue'
    );

export default [
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
]

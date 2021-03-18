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
        },
        meta: {
            title: 'Users'
        }
    },
    {
        path: '/users/:userid',
        components: {
            default: UserData
        },
        props: {
            default: true
        },
        meta: {
            title: 'User Details'
        }
    }
]

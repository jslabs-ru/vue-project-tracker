import Main from '@/components/Main.vue';
import NotFound from '@/components/NotFound.vue';

export default [
    {
        path: '/',
        components: {
            default: Main
        },
        meta: {
            title: 'Main page'
        }
    },
    {
        path: '*',
        component: NotFound,
        meta: {
            title: '404'
        }
    }
]

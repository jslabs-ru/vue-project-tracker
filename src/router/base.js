import Main from '@/components/Main.vue';
import NotFound from '@/components/NotFound.vue';

export default [
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

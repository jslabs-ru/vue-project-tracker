import Main from '@/components/Main.vue';
import Mode from '@/components/Mode.vue';
import NotFound from '@/components/NotFound.vue';

export default [
    {
        path: '/',
        component: Main,
        meta: {
            title: 'Main page'
        }
    },
    {
        path: '/mode',
        component: Mode,
        props: route => {
            const { mode } = route.query;
            if(mode === 'dev') {
                return { mode: 'DEVELOPMENT' }
            } else {
                return { mode: 'PRODUCTION' }
            }
        },
        meta: {
            title: 'Mode example page'
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

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from '@/App.vue';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);

new Vue({
    render: (h) => h(App),
    components: { App }
}).$mount('#app');

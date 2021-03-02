import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import App from '@/App.vue';
import router from '@/router';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);
Vue.use(Vuelidate);

new Vue({
    render: (h) => h(App),
    components: { App },
    router
}).$mount('#app');

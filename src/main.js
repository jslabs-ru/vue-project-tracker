import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import App from '@/App.vue';
import router from '@/router';

import EventBus from '@/plugins/eventBus';
import MessagesPanel from '@/plugins/messagesPanel';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import '@/styles/main.css';

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(EventBus);
Vue.use(MessagesPanel);

Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
})

new Vue({
    render: (h) => h(App),
    components: { App },
    router
}).$mount('#app');

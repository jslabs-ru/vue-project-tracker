import Vue from 'vue';
import Vuex from 'vuex';

import users from '@/store/modules/users';

import UserService from '@/services/userService';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users: users(UserService)
    }
});

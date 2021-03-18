import Vue from 'vue';

import {
    FETCH_USERS,
    FETCH_USER_ACCOUNT_DATA
} from '@/store/actions.type';

import {
    SET_USERS
} from '@/store/mutations.type';

export default function users (UserService) {
    const state = {
        users: []
    }

    const actions = {
        [FETCH_USERS]: (context) => UserService.getAll(),
        [FETCH_USER_ACCOUNT_DATA]: (context, id) => UserService.getUserAccountData(id),
    }

    const mutations = {
        [SET_USERS] (state, users) {
            Vue.set('users', users);
        }
    }

    const getters = {
        usersCount (state) {
            return state.users.length;
        }
    }

    return {
        state,
        actions,
        mutations,
        getters
    }
}

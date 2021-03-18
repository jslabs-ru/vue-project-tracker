import Vue from 'vue';
import { isObject, isString } from 'lodash';

import {
    FETCH_USERS,
    FETCH_USER_ACCOUNT_DATA,

    DELETE_USER_ACCOUNT,
    DELETE_USER_TASK
} from '@/store/actions.type';

import {
    SET_USERS
} from '@/store/mutations.type';

import {
    OBJECT_ID_REGEX
} from '@/constants';

export default function users (UserService) {
    const state = {
        users: []
    }

    const actions = {
        [FETCH_USERS]: (context) => UserService.getAll(),
        [FETCH_USER_ACCOUNT_DATA]: (context, userid) => UserService.getUserAccountData(userid),
        [DELETE_USER_ACCOUNT]: (context, userid) => {
            if(isString(userid) && userid.match(OBJECT_ID_REGEX)) {
                UserService.deleteUserAccount(userid);
            }
        },
        [DELETE_USER_TASK]: (context, payload) => {
            if(!isObject(payload)) return;
            const { userid, taskId } = payload;
            if(isString(userid) && userid.match(OBJECT_ID_REGEX) && taskId) {
                return UserService.deleteUserTask(payload);
            }
        },
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

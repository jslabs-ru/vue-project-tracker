import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import users from '@/store/modules/users';

import UserService from './mocks/UserService';

chai.use(sinonChai);

import {
    FETCH_USERS,
    FETCH_USER_ACCOUNT_DATA
} from '@/store/actions.type';

import {
    USER_ID
} from './mocks/config';

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        users: users(UserService)
    }
});

describe('Store users module', () => {
    let getAllSpy, getUserAccountDataSpy;

    before(function() {
        getAllSpy = sinon.spy(UserService, 'getAll');
        getUserAccountDataSpy = sinon.spy(UserService, 'getUserAccountData');
    });

    it('should perform FETCH_USER_ACCOUNT_DATA', async () => {
        let user = await store.dispatch(FETCH_USER_ACCOUNT_DATA, USER_ID);
        expect(user.userid).to.equal(USER_ID);
    });

    after(function() {
        sinon.restore();
    })
})

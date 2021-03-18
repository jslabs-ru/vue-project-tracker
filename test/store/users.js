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
    FETCH_USER_ACCOUNT_DATA,
    DELETE_USER_ACCOUNT,
    DELETE_USER_TASK
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
    let getAllSpy, getUserAccountDataSpy, deleteUserAccountSpy, deleteUserTaskSpy;

    before(function() {
        getAllSpy = sinon.spy(UserService, 'getAll');
        getUserAccountDataSpy = sinon.spy(UserService, 'getUserAccountData');
        deleteUserAccountSpy = sinon.spy(UserService, 'deleteUserAccount');
        deleteUserTaskSpy = sinon.spy(UserService, 'deleteUserTask');
    });

    it('should perform FETCH_USER_ACCOUNT_DATA', async () => {
        let user = await store.dispatch(FETCH_USER_ACCOUNT_DATA, USER_ID);
        expect(user.userid).to.equal(USER_ID);
    });

    it('should not perform DELETE_USER_ACCOUNT without valid userid', async () => {
        await store.dispatch(DELETE_USER_ACCOUNT, '1');
        expect(deleteUserAccountSpy.calledOnce).to.equal(false);
    });

    it('should perform DELETE_USER_ACCOUNT with valid userid', async () => {
        await store.dispatch(DELETE_USER_ACCOUNT, USER_ID);
        expect(deleteUserAccountSpy.calledOnce).to.equal(true);
    });

    it('should perform DELETE_USER_TASK without valid userid', async () => {
        await store.dispatch(DELETE_USER_TASK, {userid: '1'});
        expect(deleteUserTaskSpy.calledOnce).to.equal(false);
    });

    it('should perform DELETE_USER_TASK with valid userid and valid taskId', async () => {
        await store.dispatch(DELETE_USER_TASK, {userid: USER_ID, taskId: 1});
        expect(deleteUserTaskSpy.calledOnce).to.equal(true);
    });

    after(function() {
        sinon.restore();
    })
})

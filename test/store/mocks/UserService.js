import {
    USER_ID
} from './config';

const UserService = {
    getAll: function() {
        return new Promise((resolve, reject) => {
            resolve({

            })
        })
    },

    getUsersCount: function(entry) {
        return new Promise((resolve, reject) => {
            resolve(30)
        })
    },

    getUserAccountData: function(entry) {
        return new Promise((resolve, reject) => {
            resolve({
                userid: USER_ID
            })
        })
    },

    saveUserTasks: function(entry) {
        return new Promise((resolve, reject) => {
            resolve({
                ok: 1
            })
        })
    },

    deleteUserTask: function(entry) {
        return new Promise((resolve, reject) => {
            resolve({
                ok: 1
            })
        })
    },

    deleteUserAccount: function(entry) {
        return new Promise((resolve, reject) => {
            resolve({
                ok: 1
            })
        })
    },
}

export default UserService;

import axios from 'axios';

const USERS_ENDPOINT = '/api/v2/users';

const UserService = {
    getAll (payload = {}) {
        const { from, to } = payload;

        let url = from && to
            ?  `${USERS_ENDPOINT}?from=${from}&to=${to}`
            : USERS_ENDPOINT;

        return axios({
            url
        }).then(res => {
            return res.data;
        }).catch(error => {
            throw new Error('[UserService getAll]' + error.message)
        })
    },

    getUsersCount () {
        return axios({
            url: USERS_ENDPOINT + '?count=1'
        }).then(res => {
            return res.data;
        }).catch(error => {
            throw new Error('[UserService getUsersCount]' + error.message)
        })
    },

    getUserAccountData (userid) {
        return axios({
            url: `${USERS_ENDPOINT}/${userid}`
        }).then(res => {
            return res.data;
        })
    },

    deleteUserAccount (userid) {
        return axios({
            url: `${USERS_ENDPOINT}/${userid}`,
            method: 'delete'
        }).then(res => {
            return res.data;
        }).catch(error => {
            throw new Error('[UserService deleteUserAccount]' + error.message)
        })
    }
}

export default UserService;

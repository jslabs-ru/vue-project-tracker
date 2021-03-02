import axios from 'axios';

const USERS_ENDPOINT = '/api/v1/users';

const UserService = {
    getAll () {
        return axios({
            url: USERS_ENDPOINT
        }).then(res => {
            return res.data;
        }).catch(error => {
            throw new Error('[UserService getAll]' + error.message)
        })
    },

    getUserAccountData (userid) {
        return axios({
            url: `${USERS_ENDPOINT}/${userid}`
        }).then(res => {
            console.log('res...', res);
            return res.data;
        }).catch(error => {
            throw new Error('[UserService getUserAccountData]' + error.message)
        })
    }
}

export default UserService;

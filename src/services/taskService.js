import axios from 'axios';
import { isArray } from 'lodash';

const TASKS_ENDPOINT = '/api/v2/tasks';

const DELIMITER = ',';

const TaskService = {
    getAll (payload = {}) {
        const { from, to } = payload;

        let url = from && to
            ?  `${TASKS_ENDPOINT}?from=${from}&to=${to}`
            : TASKS_ENDPOINT;

        return axios({
            url
        }).then(res => {
            return res.data;
        }).catch(error => {
            throw new Error('[TaskService getAll]' + error.message)
        })
    },

    getTasksByIds (ids) {
        if(!isArray(ids)) {
            throw new Error('[TaskService getTasksByIds] Param ids should be Array');
        }
        return axios({
            url: `${TASKS_ENDPOINT}?ids=${ids.join(DELIMITER)}`
        }).then(res => {
            return res.data;
        }).catch(error => {
            throw new Error('[TaskService getTasksByIds]' + error.message)
        })
    },

    getTaskById (id) {
        return axios({
            url: `${TASKS_ENDPOINT}/${id}`
        }).then(res => {
            return res.data;
        }).catch(error => {
            throw new Error('[TaskService getTaskById]' + error.message)
        })
    },

    getTasksByToken (token = '') {
        if(!token.length) return new Promise((resolve) => resolve([]));

        return axios({
            url: `${TASKS_ENDPOINT}?token=${token}`
        }).then(res => {
            return res.data;
        }).catch(error => {
            throw new Error('[TaskService getTasksByToken]' + error.message)
        })
    },

    getTasksCount () {
        return axios({
            url: TASKS_ENDPOINT + '?count=1'
        }).then(res => {
            return res.data;
        }).catch(error => {
            throw new Error('[TaskService getAll]' + error.message)
        })
    },
}

export default TaskService;

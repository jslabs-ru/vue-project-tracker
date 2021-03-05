import axios from 'axios';

const TASKS_ENDPOINT = '/api/v2/tasks';

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

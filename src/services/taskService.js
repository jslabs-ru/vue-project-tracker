import axios from 'axios';

const TASKS_ENDPOINT = '/api/v2/tasks';

const TaskService = {
    getAll () {
        return axios({
            url: TASKS_ENDPOINT
        }).then(res => {
            return res.data;
        }).catch(error => {
            throw new Error('[TaskService getAll]' + error.message)
        })
    }
}

export default TaskService;

import axios from 'axios';

const PROJECTS_ENDPOINT = '/api/v2/projects';

const ProjectService = {
    getAll () {
        return axios({
            url: PROJECTS_ENDPOINT
        }).then(res => {
            return res.data;
        }).catch(error => {
            throw new Error('[ProjectService getAll]' + error.message)
        })
    }
}

export default ProjectService;

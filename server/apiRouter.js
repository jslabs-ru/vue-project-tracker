const express = require('express');
const bodyParser = require('body-parser');

const TASKS = 'tasks';

function createApiRouter(app) {
    const router = express.Router();

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.get('/users', async function(req, res) {
        const { from, to } = req.query;

        console.log(from, to);

        const db = app.get('db');
        const tasks = db(TASKS).whereBetween('id', [from, to]);
        res.json(tasks);
    })

    return router;
}

module.exports = createApiRouter;

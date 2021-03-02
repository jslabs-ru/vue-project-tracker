const express = require('express');
const bodyParser = require('body-parser');

const TASKS = 'tasks';

function createApiRouter(app) {
    const router = express.Router();

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.get('/users', async function(req, res) {
        const { from, to } = req.query;

        const db = app.get('db');
        const tasks = await db(TASKS).whereBetween('id', [from, to]);

        res.json(tasks);
    })

    return router;
}

module.exports = createApiRouter;

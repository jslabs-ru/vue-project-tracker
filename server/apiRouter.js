const express = require('express');
const bodyParser = require('body-parser');

const TASKS = 'tasks';

function createApiRouter(app) {
    const router = express.Router();

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.get('/tasks', async function(req, res) {
        let result,
            { from = 0, to = 10, count } = req.query;
        count = parseInt(count);

        const db = app.get('db');

        if(count === 1) {
            result = await db(TASKS).count();
            result = result[0]['count(*)'];
        } else {
            result = await db(TASKS).whereBetween('id', [from, to]);
        }


        res.json(result);
    })

    return router;
}

module.exports = createApiRouter;

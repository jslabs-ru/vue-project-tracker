const express = require('express');
const bodyParser = require('body-parser');

const TASKS = 'tasks';
const USERS = 'users';

function createApiRouter(app) {
    const router = express.Router();

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.get('/tasks', async function(req, res) {
        let result,
            { from = 0, to = 10, count, token } = req.query;
        count = parseInt(count);

        const db = app.get('db');
        if(token && token.length > 0) {
            result = await db(TASKS).where('description', 'like', `%${token}%`).limit(10);
        } else if(count === 1) {
            result = await db(TASKS).count();
            result = result[0]['count(*)'];
        } else {
            result = await db(TASKS).whereBetween('id', [from, to]);
        }

        res.json(result);
    });

    router.get('/users', async function(req, res) {
        let result,
            { from = 0, to = 10, count } = req.query;
        count = parseInt(count);

        const db = app.get('db');

        if(count === 1) {
            result = await db(USERS).count();
            result = result[0]['count(*)'];
        } else {
            result = await db(USERS).whereBetween('id', [from, to]);
        }

        res.json(result);
    });

    router.get('/users/:userid', async function(req, res) {
        const db = app.get('db');
        const { userid } = req.params;

        const users = await db(USERS).where('userid', userid);

        if(users.length) {
            res.status(200).json(users[0]);
        } else {
            res.status(404).json({
                error: 'Not found'
            });
        }
    })

    router.put('/users/:userid', async function(req, res) {
        const db = app.get('db');
        const { userid } = req.params;

        const userData = req.body;

        Object.assign(userData, {updated_at: moment().format('YYYY-MM-DD hh:mm:ss')})

        await db(USERS)
            .where('userid', userid)
            .update(userData);

        res.status(200).json({
            ok: 1
        });
    })

    router.delete('/users/:userid', async function(req, res) {
        const db = app.get('db');
        const { userid } = req.params;

        await db(USERS)
            .where('userid', userid)
            .del();

        res.status(200).json({
            ok: 1
        });
    })

    return router;
}

module.exports = createApiRouter;

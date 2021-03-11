const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');

const PROJECTS = 'projects';
const TASKS = 'tasks';
const USERS = 'users';

const DELIMITER = ',';

function createApiRouter(app) {
    const router = express.Router();

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.get('/projects', async function(req, res) {
        let result,
            { from = 0, to = 10, count } = req.query;
        count = parseInt(count);

        const db = app.get('db');
        if(count === 1) {
            result = await db(PROJECTS).count();
            result = result[0]['count(*)'];
        } else {
            result = await db(PROJECTS).whereBetween('id', [from, to]);
        }

        res.json(result);
    });

    router.get('/projects/:id', async function(req, res) {
        const db = app.get('db');
        const { id } = req.params;

        const projects = await db(PROJECTS).where('id', id);

        if(projects.length) {
            res.status(200).json(projects[0]);
        } else {
            res.status(404).json({
                error: 'Not found'
            });
        }
    });

    router.post('/projects', async function(req, res) {
        const db = app.get('db');

        const projectData = req.body;

        var { name, description, logo, created_at } = projectData;

        if(!name) {
            return res.status(400).json({
                ok: 0,
                error: 'Project name is not defined'
            });
        }

        if(!description) {
            return res.status(400).json({
                ok: 0,
                error: 'Project description is not defined'
            });
        }

        if(!logo) {
            Object.assign(projectData, {logo: ''});
        }

        if(!created_at) {
            Object.assign(projectData, {created_at: moment().format('YYYY-MM-DD hh:mm:ss')});
        } else {
            Object.assign(projectData, {created_at: moment.unix(created_at).format('YYYY-MM-DD hh:mm:ss')});
        }

        Object.assign(projectData, {updated_at: moment().format('YYYY-MM-DD hh:mm:ss')});

        await db(PROJECTS)
            .insert(projectData);

        res.status(200).json({
            ok: 1
        });
    })

    router.get('/tasks', async function(req, res) {
        let result,
            { from = 0, to = 10, count, token, ids } = req.query;
        count = parseInt(count);

        const db = app.get('db');
        if(ids && ids.length > 0) {
            ids = ids.split(DELIMITER);
            result = await db(TASKS).whereIn('id', ids);
        } else if(token && token.length > 0) {
            result = await db(TASKS).where('description', 'like', `%${token}%`).limit(10);
        } else if(count === 1) {
            result = await db(TASKS).count();
            result = result[0]['count(*)'];
        } else {
            result = await db(TASKS).whereBetween('id', [from, to]);
        }

        res.json(result);
    });

    router.get('/tasks/:id', async function(req, res) {
        let result;

        const db = app.get('db');
        const { id } = req.params;

        const tasks = await db(TASKS).where('id', id);

        if(tasks.length) {
            res.status(200).json(tasks[0]);
        } else {
            res.status(404).json({
                error: 'Not found'
            });
        }
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

    router.post('/users/:userid/tasks', async function(req, res) {
        const db = app.get('db');
        const { userid } = req.params;

        const tasks = req.body;

        await db(USERS)
            .where('userid', userid)
            .update({
                tasks: JSON.stringify(tasks)
            });

        res.status(200).json({
            ok: 1
        });
    })

    router.delete('/users/:userid/tasks/:taskId', async function(req, res) {
        const db = app.get('db');
        const { userid, taskId } = req.params;

        let user = await db(USERS)
            .where('userid', userid);

        if(user.length) {
            user = user[0];

            let tasks = user.tasks;

            tasks = JSON.parse(tasks);
            let taskIndex = tasks.indexOf(parseInt(taskId));

            if(taskIndex >= 0) {
                let deletedTaskId = tasks.splice(taskIndex, 1); /* returns array of deleted items */

                await db(USERS)
                    .where('userid', userid)
                    .update({
                        tasks: JSON.stringify(tasks)
                    });

                res.status(200).json({
                    deletedTaskId: deletedTaskId[0],
                    deletedTaskIndex: taskIndex,
                    ok: 1 /* item deleted */
                });
            } else {
                res.status(200).json({
                    ok: 0 /* item not deleted */
                });
            }
        } else {
            res.status(404).json('User not found');
        }
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

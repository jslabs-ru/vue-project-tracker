const express = require('express');
const knex = require('knex');

const createApiRouter = require('./apiRouter');

const app = express();

const PORT = parseInt(process.env.PORT) || 5000;

app.use('/api/v2', createApiRouter(app));

async function startServer(db) {
    app.set('db', db);

    app.listen(PORT, function() {
        console.log('Server is running: http://localhost:%j', PORT);
    });
}

startServer(knex({
    client: 'sqlite3',
    connection: {
        filename: './data/data.db',
    },
    useNullAsDefault: true
}));

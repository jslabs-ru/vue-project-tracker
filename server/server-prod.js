const fs = require('fs');
const knex = require('knex');
const express = require('express');
const history = require('connect-history-api-fallback');

const createApiRouter = require('./apiRouter');

const app = express();
const staticFileMiddleware = express.static(__dirname + '/../dist');

const PORT = parseInt(process.env.PORT) || 5000;

const historyMiddleware = history({
    disableDotRule: true,
    verbose: false
});

app.use(staticFileMiddleware);

app.use((req, res, next) => {
    if (req.path.match(/^\/api\/v2\//)) {
        next();
    } else {
        historyMiddleware(req, res, next);
    }
});

app.use(staticFileMiddleware);

app.use('/api/v2', createApiRouter(app));

async function startServer(db) {
    app.set('db', db);

    const server = app.listen(PORT, function() {
        console.log('Server is running: http://localhost:%j', PORT);

        if(process.send) process.send('online');
    });

    process.on('message', (message) => {
        if (message === 'shutdown') {
            console.log('Stop express server');
            server.close(() => {
                process.exit();
            });
        }
    });
}

startServer(knex({
    client: 'sqlite3',
    connection: {
        filename: './data/data.db',
    },
    useNullAsDefault: true
}));

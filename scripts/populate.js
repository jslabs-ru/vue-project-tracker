const when = require('when');
const faker = require('faker');
const ObjectID = require('bson-objectid');

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data/data.db',
    },
    useNullAsDefault: true
});

const TASKS = 'tasks';
const TASKS_COUNT = 100;

const USERS = 'users';
const USERS_COUNT = 30;

(async function() {
    await knex.schema.dropTableIfExists(TASKS);
    await knex.schema.dropTableIfExists(USERS);

    await knex.schema.createTable(TASKS, function(table) {
        table.increments();
        table.string('description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    });

    await knex.schema.createTable(USERS, function(table) {
        table.increments();
        table.string('userid').notNullable();
        table.string('name').notNullable();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    function insertTask(index) {
        return knex(TASKS).insert({
            description: faker.lorem.words()
        })
    }

    function insertUser(index) {
        return knex(USERS).insert({
            userid: ObjectID(),
            name: faker.name.findName(),
            username: faker.internet.userName().toLowerCase(),
            email: faker.internet.email()
        })
    }

    await when.iterate(
        index => index + 1,
        index => index === TASKS_COUNT,
        insertTask,
        0
    );

    await when.iterate(
        index => index + 1,
        index => index === USERS_COUNT,
        insertUser,
        0
    );

    process.exit();
})()

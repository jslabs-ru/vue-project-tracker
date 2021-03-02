const when = require('when');
const faker = require('faker');
const ObjectID = require('bson-objectid');

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data.db',
    },
    useNullAsDefault: true
});

const TASKS = 'tasks';
const TASKS_COUNT = 100;

(async function() {
    await knex.schema.dropTableIfExists(TASKS);

    await knex.schema.createTable(TASKS, function(table) {
        table.increments();
        table.string('description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    });

    function insertTask(index) {
        return knex(TASKS).insert({
            description: faker.lorem.words()
        })
    }

    await when.iterate(
        index => index + 1,
        index => index === TASKS_COUNT,
        insertTask,
        0
    );

    process.exit();
})()

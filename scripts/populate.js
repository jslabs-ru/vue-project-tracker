const faker = require('faker');
const jsonfile = require('jsonfile');
const path = require('path');

var tasks = [];

var i = 0;
while (i < 1000) {
    var description = faker.lorem.words();
    var user = faker.name.findName();
    tasks.push({
        index: i,
        description,
        user
    })
    i++;
}

jsonfile.writeFile(path.resolve(__dirname, '..', 'data', 'data.json'), tasks, function (err) {
    if (err) console.error(err)
})

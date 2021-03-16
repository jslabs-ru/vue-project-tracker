const fs = require('fs');
const dir = './data';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

fs.writeFileSync('./data/data.db', '');

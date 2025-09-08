const fs = require('fs');
const path = require('path');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${path}: ${err}`);
        } else {
            console.log(data);
        }
    }); 
}

cat(process.argv[2]);





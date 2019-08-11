const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

const port = process.env.port || 3000;

let database = new sqlite3.Database('./db/DATABASE.sqlite',(err) => {
    if (err) {
      console.error(err.message);
    }


    const app = express();


    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.use('/api/items/', require('./controllers/items'));
    app.use('/calculations/', require('./controllers/calculations'));

    app.listen(port, () => console.log(`Server started listening on port ${port}.`));


});




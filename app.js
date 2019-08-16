const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const ws = require('ws');
//const Math = require('Math');

const port = process.env.port || 3000;

let database = new sqlite3.Database('./db/DATABASE.sqlite',(err) => {
    if (err) {
      console.error(err.message);
    }


    const wsServer = new ws.Server({ port: 8080 });
    wsServer.on('connection', function connection(ws) {
      console.log ('web socket connected!');
      
      
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });
      
      setInterval(() => {
        //console.log('time');
        let num = Math.random();
        ws.send(num);
      },1000);
    
    });

    const app = express();


    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.use('/api/items/', require('./controllers/items'));
    app.use('/calculations/', require('./controllers/calculations'));

    app.listen(port, () => console.log(`Server started listening on port ${port}.`));


});




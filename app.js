const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.port || 3000;

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use('/api/items/', require('./controllers/items'));

app.listen(port, () => console.log(`Server started listening on port ${port}.`));



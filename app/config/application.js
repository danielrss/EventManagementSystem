'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

/* Setup App */
let app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));
app.use('/static', express.static(path.join(__dirname, '../../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = {
    _app: app,
    start(config) {
        const port = config.port;
        app.listen(port, () => console.log(`App running at: http://localhost:${port}`));
    }
};

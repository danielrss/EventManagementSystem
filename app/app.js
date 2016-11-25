'use strict';

const config = require('./config').development;
const app = require('./config/application');

require('./config/database')(config);
const data = require('./data')();

require('./routers')(app._app, data);

app.start(config);
'use strict';

const config = require('./config').development;
const app = require('./config/application')(config);
const data = require('./data')();

require('./config/database')(config);
require('./auth')(app, data);
require('./routers')(app, data);

//data.createEvent('Hack Conf', 'Educational', 'Sofia', 'conference', new Date('01.02.2017'), 300);

app.start();


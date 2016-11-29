'use strict';

const config = require('./config').development;
const app = require('./config/application')(config);
const data = require('./data')();

require('./config/database')(config);
require('./auth')(app, data);
require('./routers')(app, data);

data.createEvent('Concert', 'Entertainment', 'Varna', 'Christmas Concert', new Date(), 300)
    .catch((err)=>{
        console.log(err);
    });

app.start();


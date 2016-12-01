'use strict';

const config = require('./config').development;
const app = require('./config/application')(config);
const data = require('./data')();

require('./config/database')(config);
require('./auth')(app, data);
require('./routers')(app, data);

data.createEvent('HackConf', 'Education', 'Sofia', 'IT Conference', new Date('2017-02-18 10:00:00'), 'http://radorado.me/wp-content/uploads/2015/01/hackbulgaria.png', 500);
data.createEvent('Concert', 'Entertainment', 'Varna', 'Music Concert', new Date('2016-12-25 20:00:00'), 'http://odschools.org/wp-content/uploads/2015/12/Tree-550x548.jpg', 300);
data.createEvent('TestEvent', 'Graphic Design', 'Varna', 'Music Concert', new Date('2016-12-25 20:00:00'), 'http://odschools.org/wp-content/uploads/2015/12/Tree-550x548.jpg', 300);

let user = {
    firstName: 'admin',
    lastName: 'adminski',
    username: 'admin',
    password: 'admin123456',
    email: 'email@email.com',
    age: 20,
    role: 'admin'
};
data.createUser(user);

app.start();



'use strict';

const config = require('./config').development;
const app = require('./config/application')(config);
const data = require('./data')();

require('./config/database')(config);
require('./auth')(app, data);
require('./routers')(app, data);

// let event = {
//     name: 'HackConf',
//     eventType: 'Education',
//     city: 'Sofia',
//     country: 'Bulgaria',
//     address: 'Al. Malinov',
//     description: 'IT Conferencerhierhyieuryieuryeiuryieyrieryeiuryeiuyrieuyrieuyrieuyrieuyrieuryeiuyreiryeiuryeiuryieyrieyre',
//     dateOfEvent: new Date('2017-02-18 10:00:00'),
//     coverUrl: 'http://radorado.me/wp-content/uploads/2015/01/hackbulgaria.png',
//     capacity: 500
// };
// data.createEvent(event);

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



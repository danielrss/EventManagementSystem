'use strict';

const config = require('./config');
const app = require('./config/application')(config);
const data = require('./data')();

require('./config/database')(config);
require('./auth')(app, data);
require('./routers')(app, data);

let event = {
    name: 'HackConf',
    eventType: 'Education',
    city: 'Sofia',
    country: 'Bulgaria',
    address: 'Al. Malinov',
    description: 'IT Conferencerhierhyieuryieuryeiuryieyrieryeiuryeiuyrieuyrieuyrieuyrieuyrieuryeiuyreiryeiuryeiuryieyrieyre',
    dateOfEvent: new Date('2017-02-18 10:00:00'),
    coverUrl: 'http://radorado.me/wp-content/uploads/2015/01/hackbulgaria.png',
    capacity: 500,
    minAge: 10,
    rating: 5,
    isDeleted: false,
    isApproved: false
};

data.getUserById('5840621fd626ad022493c9e1')
    .then(user => {
        data.createEvent(event, user);
    });

let city1 = 'Ruse';
let country1 = 'Bulgaria';
let country2 = 'Germany';
let city3 = 'Lovech';
let category1 = 'Sport';
let category2 = 'Entertainment';
let category3 = 'Education';

data.createCity(city1);
data.createCity(city3);
data.createCountry(country1)
    .then(() => {
        data.createCity({ name: 'Veliko Tarnovo', country: 'Bulgaria' });
        data.createCity({ name: 'Sofia', country: 'Bulgaria' });
        data.createCity({ name: 'Varna', country: 'Bulgaria' });
    });

data.createCountry(country2)
    .then(() => {
        data.createCity({ name: 'Aachen', country: 'Germany' });
        data.createCity({ name: 'Koln', country: 'Germany' });
        data.createCity({ name: 'Munchen', country: 'Germany' });
    });

data.createEventType(category1);
data.createEventType(category2);
data.createEventType(category3);

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
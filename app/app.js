'use strict';

const config = require('./config').development;
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
    isApproved: true
};
data.createEvent(event);

let city1 = 'Sofia';
let city2 = 'Varna';
let country = 'Bulgaria';
let category1 = 'Education';
let category2 = 'Entertainment';

data.createCity(city1);
data.createCity(city2);
data.createCountry(country);
data.createEventType(category1);
data.createEventType(category2);

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


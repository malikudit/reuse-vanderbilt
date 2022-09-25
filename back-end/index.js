require('dotenv').config();
const sequelize = require('./models/database');
const User = require('./models/user');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
const express = require('express');
const app = express();

const cookieSession = require('cookie-session')

const user = require('./user');
const error = require('./error');

// const Keygrip = require('keygrip');

// const keys = Keygrip([])

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'], // change this
    
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'strict',
    secure: false, // change this to true in prod
    httpOnly: true,
    signed: false // change this to true in prod
}));

app.use(express.json());

app.use('/users', user);

app.use(error);

app.listen(process.env.PORT, () => {
    console.log('App listening on port ' + process.env.PORT);
});

module.exports = app;
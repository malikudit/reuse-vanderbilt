const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

const session = require('cookie-session');
const Keygrip = require('keygrip');

const user = require('./user');
const product = require('./product');
const error = require('./error');

app.enable('trust proxy');
app.disable('x-powered-by');
app.use(helmet());

app.use((req, _res, next) => {
    console.log(req.ip);
    console.log(req.hostname);
    console.log(req.method);
    console.log(req.path);
    next();
});

// Health check route for AWS load balancer
app.get('/aws-alb/health', (_req, res) => {
    res.sendStatus(200);
});

const keys = new Keygrip([process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2, process.env.COOKIE_KEY_3], 'sha256');

const corsOptions = {
    origin: /(www.)?reusevandy\.org/,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.options(cors(corsOptions));
app.use(cors(corsOptions));

app.use(session({
    name: 'session',
    keys: keys,
    
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax',
    secure: true, // change this to true in prod
    httpOnly: true,
    signed: true,

    domain: 'api.reusevandy.org'
}));

app.use(express.json());

app.use('/users', user);
app.use('/product', product);

app.use(error);

app.listen(process.env.PORT, () => {
    console.log('App listening on port ' + process.env.PORT);
});

module.exports = app;
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

const session = require('cookie-session');
const Keygrip = require('keygrip');

const user = require('./user');
const product = require('./product');
const bid = require('./bid');
const review = require('./review');
const error = require('./error');

// Security measures
app.enable('trust proxy');
app.disable('x-powered-by');
app.use(helmet());

// Health check route for AWS load balancer
app.get('/aws-alb/health', (_req, res) => {
  res.sendStatus(200);
});

app.use((req, _res, next) => {
  console.log(req.ip);
  console.log(req.hostname);
  console.log(req.method);
  console.log(req.path);
  next();
});

const keys = new Keygrip(
  [
    process.env.COOKIE_KEY_1,
    process.env.COOKIE_KEY_2,
    process.env.COOKIE_KEY_3,
  ],
  'sha256'
);

const corsOptions = {
  origin: /(www.)?reusevandy\.org/,
  // origin: 'http://localhost:3000',
  // origin: 'http://localhost:8080',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.options(cors(corsOptions));
app.use(cors(corsOptions));

app.use(
  session({
    name: 'session',
    keys: keys,

    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true,
    // sameSite: true,
    // secure: false,
    httpOnly: true,
    signed: true,

    domain: 'api.reusevandy.org'
  })
);

app.use(express.json());

app.use('/users', user);
app.use('/product', product);
app.use('/bid', bid);
app.use('/review', review);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log('App listening on port ' + process.env.PORT);
});

module.exports = app;

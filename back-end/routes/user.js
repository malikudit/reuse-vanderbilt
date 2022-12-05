const _ = require('lodash');
const express = require('express');
const router = express.Router();

const { User } = require('../models');
const { authenticateUser, generateToken } = require('./utils/auth');
const { decryptJSON } = require('./utils/verify');

router.post('/', async (req, res, next) => {
    try {
        const userInfo = _.defaultTo(_.clone(req.body.user), {});
        userInfo.state = 'Unverified';

        const user = await User.create(userInfo);
        res.send(user.selfView());
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!(password && email)) {
            throw new Error('Email address or password is missing');
        }

        const user = await User.authenticate(email, password);
        const token = await generateToken(user.id);

        req.session.authToken = token;
        res.send({ id: user.id });
    } catch (err) {
        next(err);
    }
});

router.post('/forgot-password', async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).send({
                error: 'No account exists with that email address',
            });
        } else {
            // TO DO
            // send password reset email here
            res.send(
                'Thanks! We have just sent you an email with a link to set a new password'
            );
        }
    } catch (err) {
        next(err);
    }
});

router.post('/reset-password', async (_req, _res, _next) => {
    try {
        const secret = req.query.secret;

        if (!secret) {
            const err = {
                field: 'email',
                value: email,
                msg: 'That email address is not registered',
            };

            res.status(404).send({ errors: [err] });
        } else {
        }
    } catch (err) {}
});

router.post('/logout', async (req, res, _next) => {
    req.session = null;
    res.sendStatus(200);
});

router.use(authenticateUser);

router.get('/me', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        res.send(user.selfView());
    } catch (err) {
        next(err);
    }
});

const editableFields = [
    'firstName',
    'lastName',
    'cash',
    'venmo',
    'zelle',
    'otherPaymentMethod',
    'modeOfCommunication',
    'phoneNumber',
    'groupMe',
];

router.patch('/me', async (req, res, next) => {
    const edits = _.pick(req.body, editableFields);

    // Send bad request if no edits need to be made
    if (!Object.keys(edits).length) {
        return res.sendStatus(400);
    }

    try {
        const user = await User.findByPk(req.userId);
        await user.update(edits);

        res.send(user.selfView());
    } catch (err) {
        next(err);
    }
});

router.get('/:userId', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId);

        if (!user) {
            res.sendStatus(404);
        } else {
            res.send(user.generateView());
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;

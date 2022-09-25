const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { handleError } = require('./utils/error');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body.user);
        res.status(200).send(newUser);
    } catch (e) {
        res.status(400).send(handleError(e, {
            primaryKey: 'email'
        }));
    }
});

module.exports = router;
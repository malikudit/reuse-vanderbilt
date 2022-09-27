const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body.user);
        res.status(200).send(user);
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
            res.send(user);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
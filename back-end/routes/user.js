const express = require('express');
const router = express.Router();

const { User } = require('../models');

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body.user);
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});

// TO DO:
// router.use(); // Authentication

// router.get('/me', async (req, res, next) => {

// });

// router.put('/me', async (req, res, next) => {

// });

router.get('/:userId', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            res.sendStatus(404);
        } else {
            res.send(user.displayView());
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
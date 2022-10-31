const { ValidationError } = require('sequelize');

const express = require('express');
const router = express.Router();

router.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        
    } else {
        next(err);
    }
});

// app.use((err, req, res, next) => {
//     if (err instanceof Sequelize.ValidationError) {
//         res.status(400).send(handleError(err, { primaryKey: 'email' }));
//     } else {
//         console.log('Hey');
//         next(err);
//     }
// });

router.use((_err, _req, res, _next) => {
    res.sendStatus(500);
});

// app.use((err, req, res, next) => {
//     if (err instanceof Error) {
//         res.status(400).send(err.message)
//     }
// });

module.exports = router;
const userRouter = require('./routes/user');
const Sequelize = require('sequelize');
const { handleError } = require('./routes/utils/error');

const express = require('express');
const app = express();

app.use(express.json());
app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (err instanceof Sequelize.ValidationError) {
        res.status(400).send(handleError(err, { primaryKey: 'email' }));
    } else {
        next(err);
    }
});

app.listen(process.env.PORT, () => {
    console.log('App listening on port ' + process.env.PORT);
});
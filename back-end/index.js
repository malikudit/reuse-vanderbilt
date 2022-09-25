require('dotenv').config();
const sequelize = require('./models/database');
const userRouter = require('./routes/user');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

const express = require('express');
const app = express();

app.use(express.json());
app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log('App listening on port ' + process.env.PORT);
});
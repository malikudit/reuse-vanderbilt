const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_KEY;

const { User } = require('../../models');
const { LoginError } = require('../../types/error');

async function authenticateUser(req, res, next) {
    try {
        if (!req.session.authToken) {
            throw new LoginError('You need to be logged in to view this page');
        }

        const id = await validateToken(req.session.authToken);
        req.userId = id;

        // extend the user session every 10 mins
        req.session.nowInMinutes = Math.floor(Date.now() / 60e4)

        next();
    } catch (err) {
        next(err);
    }
};

function validateToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, { algorithms: ['HS512'] }, (err, decoded) => {
            if (err)
                reject(err);

            resolve(decoded.id);
        });
    });
}

function generateToken(id) {
    return new Promise((resolve, reject) => {
        jwt.sign({ id }, privateKey, { algorithm: 'HS512' }, (err, token) => {
            if (err) 
                reject(err); // test what happens here

            resolve(token);
        });
    });
}

module.exports = {
    authenticateUser,
    validateToken,
    generateToken
};
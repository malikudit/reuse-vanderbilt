const { ValidationError } = require('sequelize');
const { LoginError } = require('../types/error');

const express = require('express');
const router = express.Router();

const validation = function (err, _req, res, next) {
    if (err instanceof ValidationError) {
        console.log(err);
        const error = err.errors.pop(0).message;

        res.status(404).send({ error });
    } else {
        next(err);
    }
}

const login = function (err, _req, res, next) {
    if (err instanceof LoginError) {
        const error = err.message;
        res.status(404).send({ error });
    } else {
        next(err);
    }
}

const serverError = function (err, _req, res, _next) {
    console.log(err);
    res.sendStatus(500);
}

module.exports = [
    validation,
    login,
    serverError
];
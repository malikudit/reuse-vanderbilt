const { ValidationError } = require('sequelize');
const { LoginError, BidError, ReviewError } = require('../types/error');

const express = require('express');
const router = express.Router();

const validation = function (err, _req, res, next) {
  if (err instanceof ValidationError) {
    console.log(err);
    const error = err.errors[0].message;

    res.status(404).send({ error });
  } else {
    next(err);
  }
};

const login = function (err, _req, res, next) {
  if (err instanceof LoginError) {
    const error = err.message;
    res.status(401).send({ error });
  } else {
    next(err);
  }
};

const bidding = function (err, _req, res, next) {
  if (err instanceof BidError) {
    const error = err.message;
    res.status(403).send({ error });
  } else {
    next(err);
  }
};

const review = function (err, _req, res, next) {
  if (err instanceof ReviewError) {
    const error = err.message;
    res.status(403).send({ error });
  } else {
    next(err);
  }
};

const serverError = function (err, _req, res, _next) {
  console.log(err);
  res.status(500).send({
    error: 'Internal Server Error'
  });
};

const clientError = function (_req, res, _next) {
  res.status(404).send({
    error: 'Not Found'
  });
};

module.exports = [validation, login, bidding, review, serverError, clientError];

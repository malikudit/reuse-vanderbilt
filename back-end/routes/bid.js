const express = require('express');
const router = express.Router();

const { Product } = require('../models');
const { authenticateUser } = require('./utils/auth');

router.use(authenticateUser);

router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);

    if (!product) {
      return res.sendStatus(404);
    }

    await product.placeBid(req.userId, req.body.bidAmount);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);

    if (!product) {
      return res.sendStatus(404);
    }

    await product.withdrawBid(req.userId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

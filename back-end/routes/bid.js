const express = require('express');
const router = express.Router();

const { Product } = require('../models');
const { authenticateUser } = require('./utils/auth');

router.use(authenticateUser);

router.put('/:productId', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId);

        if (!product) {
            return res.status(404).send({
                error: 'The product you want to place a bid on does not exist'
            });
        }

        await product.placeBid(req.userId, req.body.bidAmount);
        res.status(200).send({
            msg: 'Your bid was placed successfully'
        });
    } catch (err) {
        next(err);
    }
});

router.post('/:productId/accept', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId);

        if (!product) {
            return res.status(404).send({
                error: 'The product you want to accept a bid on does not exist'
            });
        }
        
        await product.acceptBid(req.userId);
        res.send({
            msg: 'You have successfully accepted a bid on your product'
        });
    } catch (err) {
        next(err);
    }
});

router.post('/:productId/reject', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId);

        if (!product) {
            return res.status(404).send({
                error: 'The product you want to reject a bid on does not exist'
            });
        }
        
        await product.rejectBid(req.userId);
        res.send({
            msg: 'You have successfully rejected the highest bid on your product'
        });
    } catch (err) {
        next(err);
    }
});

router.delete('/:productId', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId);

        if (!product) {
            return res.status(404).send({
                error: 'The product you want to withdraw a bid from does not exist'
            });
        }

        await product.withdrawBid(req.userId);
        res.send({
            msg: 'You have successfully withdraw your bid from this product'
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
const _ = require('lodash');
const dayjs = require('dayjs');
const express = require('express');
const router = express.Router();

const { User, Product, Bid } = require('../models');
const { authenticateUser } = require('./utils/auth');

router.get('/', async (req, res, next) => {
    try {
        // Get all active products
        const products = await Product.findAll({
            attributes: [
                'id',
                'title',
                'description',
                'category',
                'condition',
                'listingType',
                'listingPrice',
                'openBidPrice',
                'currentBid',
                'expirationDate'
            ],
            where: { state: 'Active' },
            order: [['expirationDate', 'ASC']]
        });

        res.send(products);
    } catch (err) {
        next(err);
    }
});

router.use(authenticateUser);

router.post('/', async (req, res, next) => {
    try {
        const productInfo = _.defaultTo(_.clone(req.body.product), {});
        productInfo.sellerId = req.userId;
        productInfo.state = 'Active';
        productInfo.currentBid = null;
        
        const product = await Product.create(productInfo);
        res.send(
            product.generateView()
        );
    } catch (err) {
        next(err);
    }
});

router.get('/:productId', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId, {
            include: { 
                model: User,
                as: 'seller',
                attributes: ['firstName', 'lastName'] 
            }
        });

        if (!product) {
            return res.sendStatus(404);
        }

        await product.determineRole(req.userId);
        product.set('sellerName', product.seller.get('firstName') + ' ' + product.seller.get('lastName'));
        res.send(
            product.generateView(['sellerName', 'state', 'role'])
        );
    } catch (err) {
        next(err);
    }
});

router.delete('/:productId', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId, {
            attributes: [
                'id',
                'sellerId',
                'expirationDate',
                'state'
            ]
        });

        if (!product) {
            return res.sendStatus(404);
        }

        if (product.get('sellerId') !== req.userId) {
            return res.sendStatus(403);
        }

        const state = product.get('state');
        const expirationDate = product.get('expirationDate');
        const duration = dayjs(expirationDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true).diff();
        const oneDay = 24 * 60 * 60 * 1000;

        if (state === 'Active' && duration >= oneDay) {
            await product.update({ state: 'Inactive' });
            await Bid.productInactive(req.params.productId);
            res.sendStatus(200);
        } else {
            res.sendStatus(410);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
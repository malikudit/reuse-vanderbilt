const _ = require('lodash');
const express = require('express');
const router = express.Router();

const { Product, User } = require('../models');
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
                'currentBid',
                'buyNow',
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
        productInfo.state = 'Active';     
        
        const product = await req.user.createProductsSold(productInfo);
        res.send(product.generateView());
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

        product.sellerName = product.seller.firstName + ' ' + product.seller.lastName;

        if (!product) {
            res.sendStatus(404);
        } else {
            res.send(product.generateView(['sellerName']));
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
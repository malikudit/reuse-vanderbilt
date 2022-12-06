const _ = require('lodash');
const express = require('express');
const router = express.Router();

const { User, Product, Review } = require('../models');
const { authenticateUser } = require('./utils/auth');

router.use(authenticateUser);

router.get('/:userId', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            attributes: [
                'id'
            ],
            include: {
                model: Review,
                as: 'reviewsReceived',
                attributes: [
                    'id',
                    'reviewType',
                    'title',
                    'stars',
                    'body',
                    'productId',
                    'reviewerId'
                ]
            }
        });

        const reviews = user.reviewsReceived.map(review => review.toJSON());
        res.send(reviews);
    } catch (err) {
        next(err);
    }
});

router.post('/:productId',  async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId, {
            attributes: [
                'id',
                'expirationDate',
                'state',
                'sellerId',
                'buyerId'
            ],
            include: [
                {
                    model: Review,
                    as: 'buyerReview',
                    attributes: [
                        'reviewType'
                    ]
                },
                {
                    model: Review,
                    as: 'sellerReview',
                    attributes: [
                        'reviewType'
                    ]
                }
            ]
        });

        if (!product) {
            return res.sendStatus(404);
        }

        const reviewInfo = _.defaultTo(_.pick(req.body, [ 'title', 'stars', 'body' ]), {});
        await product.createReview(req.userId, reviewInfo);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
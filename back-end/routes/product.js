const _ = require('lodash');
const dayjs = require('dayjs');
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { User, Product, Bid, Photo } = require('../models');
const { authenticateUser } = require('./utils/auth');
const upload = require('./utils/upload');

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
            include: {
                model: Photo,
                as: 'coverPhoto',
                attributes: ['id']
            },
            where: { 
                state: 'Active',
                expirationDate: {
                    [Op.gt]: new Date()
                }
            },
            order: [['expirationDate', 'ASC']]
        });

        const newProducts = products.map(product => {
            const tmp = product.toJSON();
            tmp.coverPhoto = `https://img.reusevandy.org/${tmp.coverPhoto.id}`;
            return tmp;
        });

        console.log(newProducts);

        res.send(newProducts);
    } catch (err) {
        next(err);
    }
});

router.use(authenticateUser);

const requiredFields = [
    'title',
    'description',
    'category',
    'condition',
    'listingType',
    'listingPrice',
    'openBidPrice',
    'bidIncrement',
    'currentBid',
    'expirationDate',
    'location'
];

router.post('/', upload.single('coverImage'), async (req, res, next) => {
    try {
        console.log(req.body);
        const productInfo = _.defaultTo(_.pick(req.body, requiredFields), {});
        productInfo.sellerId = req.userId;
        productInfo.state = 'Active';
        productInfo.currentBid = null;
        
        const product = await Product.create(productInfo);
        const photo = await product.createCoverPhoto({
            id: req.file.key,
            photoType: 'Product - Cover',
            imageType: 'png'
        });
        console.log(photo)

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
            include: [
                { 
                    model: User,
                    as: 'seller',
                    attributes: ['firstName', 'lastName'] 
                },
                {
                    model: Photo,
                    as: 'coverPhoto',
                    attributes: ['id']
                }
            ]
        });

        if (!product) {
            return res.sendStatus(404);
        }

        await product.determineRole(req.userId);
        product.sellerName = product.seller.firstName + ' ' + product.seller.lastName;
        if (product.bidderId) {
            const user = await User.findByPk(product.bidderId);
            product.bidderName = user.firstName + ' ' + user.lastName;
        }
        product.coverPhoto = `https://img.reusevandy.org/${product.coverPhoto.id}`;

        res.send(
            product.generateView(['sellerName', 'bidderId', 'bidderName', 'coverPhoto', 'state', 'role'])
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
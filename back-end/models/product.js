const _ = require('lodash');
const { DataTypes, Model } = require('sequelize');
const dayjs = require('dayjs');
const validator = require('validator');
const { nanoid } = require('nanoid/async');

const sequelize = require('./database');

const { BidError } = require('../types/error');

const defaultFields = [
    'id',
    'sellerId',
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
    'location',
    'state',
];

class Product extends Model {
    generateView(additionalFields = []) {
        return _.pick(this, defaultFields.concat(additionalFields));
    }

    async determineRole(userId) {
        // Default role is Other if no branches match
        this.role = 'Other';

        if (this.get('sellerId') === userId) {
            this.role = 'Seller';
        } else if (
            this.get('state') === 'Sold' &&
            this.get('buyerId') === userId
        ) {
            this.role = 'Buyer';
        } else if (this.get('state') === 'Sold') {
            const bids = await this.getBids();
            console.log(bids);
        } else if (this.get('state') === 'Active') {
        } else if (this.get('state') === 'Evaluating Offers') {
        }
    }

    async placeBid(bidderId, amount) {
        if (this.get('sellerId') === bidderId) {
            throw new BidError('You cannot bid on your own product listing');
        }

        if (this.get('state') !== 'Active') {
            throw new BidError(
                'You cannot bid on a non-active product listing'
            );
        }

        const listingType = this.get('listingType');

        if (listingType === 'Listing Price') {
            const previousBid = await this.countBids({
                where: {
                    productId: this.get('id'),
                    bidderId,
                    state: 'Active',
                },
            });

            if (previousBid) {
                throw new BidError(
                    'You have already made an offer on this product'
                );
            }

            await this.createBid({
                amount: this.get('listingPrice'),
                bidderId,
                state: 'Active',
            });
        } else {
            if (!(amount && validator.isInt(amount + ''))) {
                throw new BidError('Please specify the amount you want to bid');
            }
            amount = validator.toInt(amount + '');

            const openBidPrice = this.get('openBidPrice');

            if (amount < openBidPrice) {
                throw new BidError(
                    `Your bid can not be lower than the opening bid price of $${openBidPrice}`
                );
            }

            const bidIncrement = this.get('bidIncrement');
            const diff = amount - openBidPrice;
            const divisible = validator.isDivisibleBy(diff + '', bidIncrement);

            if (!divisible) {
                throw new BidError(
                    `Your bid must be $${openBidPrice} + a non-negative multiple of $${bidIncrement}`
                );
            }

            const currentBid = this.get('currentBid');
            if (currentBid) {
                if (amount <= currentBid) {
                    throw new BidError(
                        `Your bid must be more than the current bid of $${currentBid}`
                    );
                }

                // Use an indirect reference to Bid model to avoid importing it here and creating
                // circular import dependencies
                await sequelize.models.Bid.update(
                    { state: 'Increased Bid' },
                    {
                        where: {
                            productId: this.get('id'),
                            bidderId,
                            state: 'Active',
                        },
                    }
                );
            }

            await this.createBid({
                amount,
                bidderId,
                state: 'Active',
            });

            await this.update({ currentBid: amount });
        }
    }

    async withdrawBid(bidderId) {
        if (this.get('sellerId') === bidderId) {
            throw new BidError(
                'You cannot withdraw bids on your own product listing'
            );
        }

        if (this.get('state') !== 'Active') {
            throw new BidError(
                'You cannot withdraw bids on a non-active product listing'
            );
        }

        const updated = await sequelize.models.Bid.update(
            { state: 'Withdrawn' },
            {
                where: {
                    productId: this.get('id'),
                    bidderId,
                    state: 'Active',
                },
            }
        );

        // If no bids were withdrawn, then the user had no active bids
        if (!updated[0]) {
            throw new BidError(
                'You do not have an active bid on the product to withdraw'
            );
        }

        const highestActiveBid = await sequelize.models.Bid.max('amount', {
            where: {
                productId: this.get('id'),
                state: 'Active',
            },
        });

        await this.update({ currentBid: highestActiveBid });
    }
}

Product.init(
    {
        id: {
            type: DataTypes.CHAR(21),
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(32),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Product title is a required field',
                },
                notIn: {
                    args: [[true, false, NaN]],
                    msg: 'Product title must be alphanumeric',
                },
                is: {
                    args: '[a-zA-Z0-9 ]*',
                    msg: 'Product title must be alphanumeric',
                },
                len: {
                    args: [5, 32],
                    msg: 'Product title must be between 2 to 32 characters long',
                },
            },
        },
        description: {
            type: DataTypes.STRING(250),
            allowNull: true,
            validate: {
                notIn: {
                    args: [[true, false, NaN]],
                    msg: 'Product description must be alphanumeric',
                },
                is: {
                    args: '[a-zA-Z0-9 ]*',
                    msg: 'Product description must be alphanumeric',
                },
                len: {
                    args: [20, 250],
                    msg: 'Product description must be between 20 to 250 characters long',
                },
            },
        },
        category: {
            type: DataTypes.ENUM(
                'Home',
                'Books',
                'Clothing',
                'Electronics',
                'Furniture',
                'Kitchen',
                'Tickets',
                'Transportation',
                'Other'
            ),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Category is a required field for every product',
                },
                isIn: {
                    args: [
                        [
                            'Home',
                            'Books',
                            'Clothing',
                            'Electronics',
                            'Furniture',
                            'Kitchen',
                            'Tickets',
                            'Transportation',
                            'Other',
                        ],
                    ],
                    msg: 'Category is not a valid option',
                },
            },
        },
        condition: {
            type: DataTypes.ENUM('New', 'Like New', 'Slightly Used', 'Used'),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Condition is a required field for every product',
                },
                isIn: {
                    args: [['New', 'Like New', 'Slightly Used', 'Used']],
                    msg: 'Condition must be either New, Like New, Slightly Used or Used',
                },
            },
        },
        listingType: {
            type: DataTypes.ENUM('Listing Price', 'Bid Only'),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Listing type is a required field for every product',
                },
                isIn: {
                    args: [['Listing Price', 'Bid Only']],
                    msg: 'Listing type must be either listing only or bid only',
                },
                verifyListingPrice(value) {
                    if (value === 'Listing Price' && !this.listingPrice) {
                        throw new Error(
                            'Listing price is a required field when selling at a listing price'
                        );
                    }
                },
                verifyBiddingFields(value) {
                    if (value === 'Listing Price') return;

                    if (!this.openBidPrice) {
                        throw new Error(
                            'Open bid price is a required field if you are supporting bidding'
                        );
                    }
                    if (!this.bidIncrement) {
                        throw new Error(
                            'Bid increment is a required field if you are supporting bidding'
                        );
                    }
                },
            },
        },
        listingPrice: {
            type: DataTypes.INTEGER.UNSIGNED,
            validate: {
                isInt: {
                    msg: 'Listing price must be set in $1 increments',
                },
                min: {
                    args: 5,
                    msg: 'Listing price must be atleast $5',
                },
                max: {
                    args: 9999,
                    msg: 'Listing price must be less than $10,000',
                },
                dollarIncrements(value) {
                    if (
                        value !== null &&
                        !validator.isDivisibleBy(value + '', '1')
                    ) {
                        throw new Error(
                            'Listing price must be set in $1 increments'
                        );
                    }
                },
            },
        },
        openBidPrice: {
            type: DataTypes.INTEGER.UNSIGNED,
            validate: {
                isInt: {
                    msg: 'Opening bid price must be set in $1 increments',
                },
                min: {
                    args: 5,
                    msg: 'Opening bid price must be atleast $5',
                },
                max: {
                    args: 9999,
                    msg: 'Opening bid price must be less than $10,000',
                },
                dollarIncrements(value) {
                    if (
                        value !== null &&
                        !validator.isDivisibleBy(value + '', '1')
                    ) {
                        throw new Error(
                            'Opening bid price must be set in $1 increments'
                        );
                    }
                },
            },
        },
        bidIncrement: {
            type: DataTypes.INTEGER.UNSIGNED,
            validate: {
                isInt: {
                    msg: 'Bid increment must be set in $1 increments',
                },
                min: {
                    args: 1,
                    msg: 'Bid increment must be atleast $1',
                },
                max: {
                    args: 1000,
                    msg: 'Bid increment must be less than $1,000',
                },
                dollarIncrements(value) {
                    if (
                        value !== null &&
                        !validator.isDivisibleBy(value + '', '1')
                    ) {
                        throw new Error(
                            'Bid increment must be set in $1 increments'
                        );
                    }
                },
            },
        },
        currentBid: {
            type: DataTypes.INTEGER.UNSIGNED,
            validate: {
                isInt: {
                    msg: 'Current bid must be set in $1 increments',
                },
                min: {
                    args: 5,
                    msg: 'Current bid must be atleast $5',
                },
                max: {
                    args: 9999,
                    msg: 'Current bid must be less than $10,000',
                },
                dollarIncrements(value) {
                    if (
                        value !== null &&
                        !validator.isDivisibleBy(value + '', '1')
                    ) {
                        throw new Error(
                            'Current bid must be set in $1 increments'
                        );
                    }
                },
            },
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Expiration date is a required field',
                },
                validDateTime(value) {
                    if (
                        !dayjs(
                            value + '',
                            'YYYY-MM-DDTHH:mm:ss.SSSZ',
                            true
                        ).isValid()
                    ) {
                        throw new Error(
                            'Expiration date must be a valid ISO string'
                        );
                    }
                },
            },
        },
        location: {
            type: DataTypes.ENUM(
                'Exchange at Common Point',
                'Buyer Comes to Seller',
                'Seller Delivers to Buyer'
            ),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Point of exchange is a required field for every product',
                },
                isIn: {
                    args: [
                        [
                            'Exchange at Common Point',
                            'Buyer Comes to Seller',
                            'Seller Delivers to Buyer',
                        ],
                    ],
                    msg: 'Point of exchange is not a valid option',
                },
            },
        },
        state: {
            type: DataTypes.ENUM(
                'Active',
                'Inactive',
                'Evaluating Offers',
                'Sold'
            ),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Product must be in a valid state at all times',
                },
                isIn: {
                    args: [['Active', 'Inactive', 'Evaluating Offers', 'Sold']],
                    msg: 'State of the product must be either Active, Inactive, Evaluating Offers or Sold',
                },
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (product) => {
                const productId = await nanoid();
                product.setDataValue('id', productId);
            },
            beforeSave: (product) => {
                if (product.getDataValue('listingType') === 'Listing Price') {
                    product.setDataValue('openBidPrice', null);
                    product.setDataValue('bidIncrement', null);
                    product.setDataValue('currentBid', null);
                } else {
                    product.setDataValue('listingPrice', null);
                }
            },
        },
        indexes: [
            {
                fields: [
                    'state',
                    {
                        name: 'expirationDate',
                        order: 'ASC',
                    },
                ],
            },
            {
                fields: ['sellerId'],
            },
            {
                fields: ['buyerId'],
            },
        ],
        sequelize,
        validate: {
            expirationDateRange() {
                if (this.changed('expirationDate')) {
                    const value = this.expirationDate;
                    const duration = dayjs(
                        value + '',
                        'YYYY-MM-DDTHH:mm:ss.SSSZ',
                        true
                    ).diff();

                    if (duration < 0) {
                        throw new Error(
                            'Expiration date can not be in the past'
                        );
                    }

                    const threeHours = 3 * 60 * 60 * 1000;
                    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
                    if (duration < threeHours) {
                        throw new Error(
                            'Expiration date must be at least three hours from now'
                        );
                    }

                    if (duration > twoWeeks) {
                        throw new Error(
                            'Expiration date can not be longer than 14 days in the future'
                        );
                    }
                }
            },
        },
        paranoid: true,
    }
);

module.exports = Product;

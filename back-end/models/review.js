const { DataTypes, Model } = require('sequelize');
const validator = require('validator');
const { nanoid } = require('nanoid/async');

const sequelize = require('./database');

class Review extends Model {

}

Review.init({
    id: {
        type: DataTypes.CHAR(21),
        primaryKey: true
    },
    reviewType: {
        type: DataTypes.ENUM('Buyer', 'Seller'),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Review type is a required field for all reviews'
            },
            isIn: {
                args: [['Buyer', 'Seller']],
                msg: 'Review type must be either buyer or seller'
            }
        }
    },
    title: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Review title is a required field'
            },
            notIn: {
                args: [[true, false, NaN]],
                msg: 'Review title must be alphanumeric'
            },
            is: {
                args: '[a-zA-Z0-9 ]*',
                msg: 'Review title must be alphanumeric'
            },
            len: {
                args: [5, 32],
                msg: 'Review title must be between 5 to 32 characters long'
            }
        }
    },
    stars: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Number of stars is a required field for all reviews'
            },
            min: {
                args: 1,
                msg: 'Number of stars in a rating can not be lower than 1'
            },
            max: {
                args: 5,
                msg: 'Number of stars in a rating must be less than 5'
            },
            halfPointIncrements(value) {
                const decimal = validator.toFloat(value + '') * 2;
                if (!validator.isDivisibleBy(decimal + '', '1')) {
                    throw new Error('Number of stars in a rating must in increments of 0.5');
                }
            }
        }
    },
    body: {
        type: DataTypes.STRING(250),
        allowNull: true,
        validate: {
            notIn: {
                args: [[true, false, NaN]],
                msg: 'Review body must be alphanumeric'
            },
            is: {
                args: '[a-zA-Z0-9 ]*',
                msg: 'Review body must be alphanumeric'
            },
            len: {
                args: [20, 250],
                msg: 'Review body must be between 20 to 250 characters long'
            }
        }
    }
}, {
    hooks: {
        beforeCreate: async (review) => {
            const reviewId = await nanoid();
            review.setDataValue('id', reviewId);
        }
    },
    indexes: [
        { 
            fields: ['productId'] 
        },
        { 
            fields: ['reviewerId'] 
        },
        { 
            fields: ['revieweeId'] 
        }
    ],
    sequelize,
    paranoid: true
})

module.exports = Review;
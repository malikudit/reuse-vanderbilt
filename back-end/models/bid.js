const { DataTypes, Model } = require('sequelize');
const validator = require('validator');
const { nanoid } = require('nanoid/async');

const sequelize = require('./database');

class Bid extends Model {

}

Bid.init({
    id: {
        type: DataTypes.CHAR(21),
        primaryKey: true
    },
    amount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'Bid amount must be set in $1 increments'
            },
            min: {
                args: 5,
                msg: 'Bid amount must be atleast $5'
            },
            max: {
                args: 9999,
                msg: 'Bid amount must be less than $10,000'
            },
            dollarIncrements(value) {
                if (!validator.isDivisibleBy(value + '', '1')) {
                    throw new Error('Listing price must be set in $1 increments');
                }
            }
        }
    },
    state: {
        type: DataTypes.ENUM('Active', 'Increased Bid', 'Withdrawn', 'Product Delisted', 'Under Evaluation', 'Rejected', 'Booked', 'Out-bid', 'Other Bid Accepted'),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Bid must be in a valid state at all times'
            },
            isIn: {
                args: [['Active', 'Increased Bid', 'Withdrawn', 'Product Delisted', 'Under Evaluation', 'Rejected', 'Booked', 'Out-bid', 'Other Bid Accepted']],
                msg: 'State of bid is not a valid option'
            }
        }
    }
}, {
    hooks: {
        beforeCreate: async (bid) => {
            const bidId = await nanoid();
            bid.setDataValue('id', bidId);
        }
    },
    sequelize,
    paranoid: true
});

module.exports = Bid;
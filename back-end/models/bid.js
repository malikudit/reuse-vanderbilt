const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database');

class Bid extends Model {

}

Bid.init({
    buyerUsername: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            notNull: {
                msg: ''
            },
            isAlphanumeric: {
                msg: ''
            },
            len: [4, 32] // Look at this
        }
    },
    amount: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        validate: {
            isDecimal: {
                msg: ''
            },
            min: 0
        }
    },
    status: {
        type: DataTypes.ENUM('Active', 'Increased Bid', 'Withdrawn', 'Under Consideration', 'Rejected', 'Outbid', 'Accepted'),
        allowNull: false,

    }
}, { sequelize });

module.exports = Bid;
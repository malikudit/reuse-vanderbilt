const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database');
const Bid = require('./bid');

class Product extends Model {
    
}

Product.init({
    sellerUsername: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            isAlphanumeric: {
                msg: ''
            },
            notNull: {
                msg: ''
            },
            len: [4, 32] // Look at this
        }
    },
    title: {
        type: DataTypes.STRING(32), // Get confirmation
        allowNull: false,
        validate: {
            is: {
                args: '[a-zA-Z0-9 ]*',
                msg: 'Title failed regex'
            },
            len: [5, 32],
            notNull: {
                msg: ''
            }
        }
    },
    description: {
        type: DataTypes.STRING(512), // Get confirmation
        allowNull: true,
        validate: {
            len: [20, 512]
        }
    },
    condition: {
        type: DataTypes.ENUM('New', 'Used'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['New', 'Used']],
                msg: ''
            }
        }
    },
    listingPrice: { // Can someone only have a bidding and no buy-now price
        type: DataTypes.DECIMAL(6, 2).UNSIGNED,
        allowNull: false,
        validate: {
            isNumeric: {
                msg: ''
            },
            isDecimal: {
                msg: ''
            },
            min: 0
        }
    },
    allowBidding: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: ''
            },
            isIn: {
                args: [['true', 'false', true, false]],
                msg: ''
            }
        },
        set(value) {
            if (value instanceof String) {
                this.setDataValue('allowBidding', value === 'true' ? true : false);
            } else {
                this.setDataValue('allowBidding', value);
            }
        }
    },
    openBidPrice: {
        type: DataTypes.DECIMAL(6, 2).UNSIGNED,
        allowNull: true,
        validate: {
            isDecimal: {
                msg: ''
            },
            min: 0,
            notNullIfBiddingEnabled(value) {
                if (this.allowBidding && value === null) {
                    throw new Error('');
                }
            }
            // halfDollarIncrements(value) {
            //     if (value % )
            // }
        }
    },
    bidIncrement: {
        type: DataTypes.DECIMAL(3, 1).UNSIGNED,
        allowNull: true,
        validate: {
            isDecimal: {
                msg: ''
            },
            notNullIfBiddingEnabled(value) {
                if (this.allowBidding && value === null) {
                    throw new Error('');
                }
            }
        }
    },
    bidTimeIncrement: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        validate: {
            min: 0,
            notNullIfBiddingEnabled(value) {
                if (this.allowBidding && value === null) {
                    throw new Error('');
                }
            }
        }
    },
    bidFinalEndTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    buyerUsername: {
        type: DataTypes.STRING(32),
        allowNull: true,
        validate: {
            isAlphanumeric: {
                msg: ''
            },
            len: [4, 32] // Look at this
        }
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Deleted', 'Evaluating Offers', 'Booked', 'Sold'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Active', 'Inactive', 'Deleted', 'Evaluating Offers', 'Booked', 'Sold']],
                msg: ''
            }
        }
    }
}, { sequelize });

Product.hasMany(Bid);
Bid.belongsTo(Product);

module.exports = Product;
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database');
const Product = require('./product');

class User extends Model {
    
}

User.init({
    firstName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            isAlpha: {
                msg: ''
            },
            len: [2, 32]
        }
    },
    lastName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            isAlpha: {
                msg: ''
            },
            len: [2, 32]
        }
    },
    userName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
        validate: {
            isAlphanumeric: {
                msg: ''
            },
            len: [4, 32] // Look at this
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
            isEmail: {
                msg: ''
            }
        }
    },
    paymentMethod: {
        type: DataTypes.ENUM('Cash', 'Venmo', 'Zelle', 'Other'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Cash', 'Venmo', 'Zelle', 'Other']],
                msg: ''
            },
            notNull: {
                msg: 'Please enter your name'
            }
        }
    },
    modeOfCommunication: {
        type: DataTypes.ENUM('Phone', 'GroupMe'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Phone', 'GroupMe']],
                msg: ''
            },
            notNull: {
                msg: 'Please enter your name'
            }
        }
    },
    // One of the two is required
    phoneNumber: {
        type: DataTypes.STRING, // Validation needed
        validate: {
            notNullIfPreferred(value) {
                if (value === null && this.modeOfCommunication === 'Phone') {
                    throw new Error('');
                }
            }
        }
    },
    groupMe: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
            notNullIfPreferred(value) {
                if (value === null && this.modeOfCommunication === 'GroupMe') {
                    throw new Error('');
                }
            }
        }
    }
}, { sequelize });

User.hasMany(Product, { as: 'productsSold', sourceKey: 'userName', foreignKey: 'sellerUsername' });
User.hasMany(Product, { as: 'productsPurchased', sourceKey: 'userName', foreignKey: 'buyerUsername' });
Product.belongsTo(User, { as: 'Seller', sourceKey: 'sellerUsername', foreignKey: 'userName' });
Product.belongsTo(User, { as: 'Buyer', sourceKey: 'buyerUsername', foreignKey: 'userName' });

(async () => {
    if (process.env.NODE_ENV === 'production') {
        await sequelize.sync();
    } else {
        await sequelize.sync({ force: true });
    }
})();

module.exports = User;
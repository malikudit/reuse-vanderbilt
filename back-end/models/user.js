const { DataTypes, Model } = require('sequelize');
const validator = require('validator');
const { nanoid } = require('nanoid/async');

const sequelize = require('./database');

class User extends Model {
    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            cash: this.cash,
            zelle: this.zelle,
            venmo: this.venmo,
            otherPaymentMethod: this.otherPaymentMethod,
            modeOfCommunication: this.modeOfCommunication,
            phoneNumber: this.phoneNumber,
            groupMe: this.groupMe
        };
    }
}

User.init({
    id: {
        type: DataTypes.CHAR(21),
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'First name is a required field'
            },
            isAlpha: {
                msg: 'First name must be alphabetical'
            },
            len: {
                args: [2, 32],
                msg: 'First name must be between 2 to 32 characters long'
            }
        }
    },
    lastName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Last name is a required field'
            },
            isAlpha: {
                msg: 'Last name must be alphabetical'
            },
            len: {
                args: [2, 32],
                msg: 'Last name must be between 2 to 32 characters long'
            }
        }
    },
    userName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Username is a required field'
            },
            isAlphanumeric: {
                msg: 'Username must only contain alphabets and numbers'
            },
            len: {
                args: [4, 32],
                msg: 'Username must be between 4 to 32 characters long'
            }
        }
    },
    email: {
        type: DataTypes.STRING(254),
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email address is a required field'
            },
            validateEmailAddress(value) {
                if (!validator.isEmail(value + '')) {
                    throw new Error('Email address is not well formed');
                }
            },
            validateVanderbiltEmail(value) {
                const lower_domain = value.split('@').pop().toLowerCase();
                if (lower_domain !== 'vanderbilt.edu') {
                    throw new Error('Please use a vanderbilt.edu email address to sign up');
                }
            }
        }
    },
    cash: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'You must specify whether Cash is a supported payment type'
            },
            validateBoolean(value) {
                if (!validator.isBoolean(value + '')) {
                    throw new Error('Cash is not a well formed boolean value');
                }
            }
        }
    },
    venmo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'You must specify whether Venmo is a supported payment type'
            },
            validateBoolean(value) {
                if (!validator.isBoolean(value + '')) {
                    throw new Error('Venmo is not a well formed boolean value');
                }
            }
        }
    },
    zelle: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'You must specify whether Zelle is a supported payment type'
            },
            validateBoolean(value) {
                if (!validator.isBoolean(value + '')) {
                    throw new Error('Zelle is not a well formed boolean value');
                }
            }
        }       
    },
    otherPaymentMethod: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'You must specify whether Other payment methods are supported'
            },
            validateBoolean(value) {
                if (!validator.isBoolean(value + '')) {
                    throw new Error('Other payment method is not a well formed boolean value');
                }
            }
        }
    },
    modeOfCommunication: {
        type: DataTypes.ENUM('Phone', 'GroupMe'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Phone', 'GroupMe']],
                msg: 'Preferred mode of communication must be either Phone or GroupMe'
            },
            notNull: {
                msg: 'Must specify a preferred mode of communication'
            },
            notNullIfPreferred(value) {
                if (value === 'Phone' && !this.phoneNumber) {
                    throw new Error('A phone number is required if Phone is the preferred means of communication');
                } else if (value === 'GroupMe' && !this.groupMe) {
                    throw new Error('A GroupMe URL is required if GroupMe is the preferred means of communication');
                }
            }
        }
    },
    phoneNumber: {
        type: DataTypes.CHAR(10),
        validate: {
            validatePhoneNumber(value) {
                if (value !== null && !validator.isMobilePhone(value + '', 'en-US')) {
                    throw new Error('A valid US phone number is required');
                }
            }
        }
    },
    groupMe: {
        type: DataTypes.STRING,
        validate: {
            validateGroupMeURL(value) {
                if (value !== null && 
                        !validator.isURL(value + '', {
                            protocols: ['https'],
                            require_protocol: true,
                            host_whitelist: ['groupme.com', 'www.groupme.com'] 
                        })) {
                    throw new Error('The provided URL must be from groupme.com and use https');
                }
            }
        }
    }
}, {
    hooks: {
        beforeCreate: async (product) => {
            const productId = await nanoid();
            product.id = productId;
        },
        beforeSave: (user) => {
            if (user.phoneNumber) {
                const phoneNumber = (user.phoneNumber + '').replaceAll(/[+\-()]/g, '');
                if (phoneNumber[0] === '1') {
                    user.setDataValue('phoneNumber', phoneNumber.substring(1));
                } else {
                    user.setDataValue('phoneNumber', phoneNumber);
                }
            }
        }
    },
    sequelize
});

(async () => {
    if (process.env.NODE_ENV === 'production') {
        await sequelize.sync();
    } else {
        await sequelize.sync({ force: true });
    }
})();

module.exports = User;
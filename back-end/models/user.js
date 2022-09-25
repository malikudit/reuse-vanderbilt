const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database');
const validator = require('validator');

class User extends Model {
    
}

User.init({
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
        primaryKey: true,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email address is a required field'
            },
            validateEmailAddress(value) {
                if (!validator.isEmail(value)) {
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
    paymentMethod: {
        type: DataTypes.ENUM('Cash', 'Venmo', 'Zelle', 'Other'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Cash', 'Venmo', 'Zelle', 'Other']],
                msg: 'Payment method should be one of Cash, Venmo, Zelle or Other'
            },
            notNull: {
                msg: 'Payment method is a required field'
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
            }
        }
    },
    phoneNumber: {
        type: DataTypes.STRING(10),
        validate: {
            notNullIfPreferred(value) {
                if (value === null && this.modeOfCommunication === 'Phone') {
                    throw new Error('A phone number is required if Phone is the preferred means of communication');
                }
            },
            validatePhoneNumber(value) {
                if (value !== null && !validator.isMobilePhone(value + '', 'en-US')) {
                    throw new Error('A valid US phone number is required');
                }
            }
        },
        set(value) {
            if (value === null) return;

            const phoneNumber = (value + '').replaceAll(/[+\-()]/g, '');
            if (phoneNumber[0] === '1') {
                this.setDataValue('phoneNumber', phoneNumber.substring(1));
            } else {
                this.setDataValue('phoneNumber', phoneNumber);
            }
        }
    },
    groupMe: {
        type: DataTypes.STRING,
        validate: {
            notNullIfPreferred(value) {
                if (value === null && this.modeOfCommunication === 'GroupMe') {
                    throw new Error('A GroupMe URL is required if GroupMe is the preferred means of communication');
                }
            },
            validateGroupMeURL(value) {
                if (value !== null && 
                        !validator.isURL(value + '', { host_whitelist: ['groupme.com'] })) {
                    throw new Error('The provided URL must be from groupme.com');
                }
            }
        }
    }
}, { sequelize });

(async () => {
    if (process.env.NODE_ENV === 'production') {
        await sequelize.sync();
    } else {
        await sequelize.sync({ force: true });
    }
})();

module.exports = User;
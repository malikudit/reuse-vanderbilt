const _ = require('lodash');
const { DataTypes, Model, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { nanoid } = require('nanoid/async');

const sequelize = require('./database');
const { LoginError } = require('../types/error');

const defaultFields = [
  'id',
  'firstName',
  'lastName',
  'cash',
  'venmo',
  'zelle',
  'otherPaymentMethod',
  'modeOfCommunication',
  'phoneNumber',
  'groupMe',
];

class User extends Model {
  static async authenticate(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new LoginError('No account exists with that email address');
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return user;
    }

    throw new LoginError('The provided password is incorrect');
  }

  selfView() {
    return this.generateView(['email']);
  }

  generateView(additionalFields = []) {
    return _.pick(this, defaultFields.concat(additionalFields));
  }
}

User.init(
  {
    id: {
      type: DataTypes.CHAR(21),
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is a required field',
        },
        notIn: {
          args: [[true, false, NaN]],
          msg: 'First name must be alphabetical',
        },
        isAlpha: {
          msg: 'First name must be alphabetical',
        },
        len: {
          args: [2, 32],
          msg: 'First name must be between 2 to 32 characters long',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name is a required field',
        },
        notIn: {
          args: [[true, false, NaN]],
          msg: 'Last name must be alphabetical',
        },
        isAlpha: {
          msg: 'Last name must be alphabetical',
        },
        len: {
          args: [2, 32],
          msg: 'Last name must be between 2 to 32 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email address is a required field',
        },
        validateEmailAddress(value) {
          if (!validator.isEmail(value + '')) {
            throw new Error('Email address is not well formed');
          }
        },
        validateVanderbiltEmail(value) {
          const lower_domain = value.split('@').pop().toLowerCase();
          if (lower_domain !== 'vanderbilt.edu') {
            throw new Error(
              'Please use a vanderbilt.edu email address to sign up'
            );
          }
        },
      },
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is a required field',
        },
        len: {
          args: [8, 60],
          msg: 'Password must be between 8 to 32 characters long',
        },
        strongPassword(value) {
          if (!validator.isStrongPassword(value + '')) {
            throw new Error(
              'Password must include at least one uppercase, one lowercase, one number and a special character'
            );
          }
        },
      },
    },
    state: {
      type: DataTypes.ENUM('Unverified', 'Verified'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User must be in a valid state at all times',
        },
        isIn: {
          args: [['Unverified', 'Verified']],
          msg: 'State must be either Unverified or Verified',
        },
      },
    },
    cash: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: 'You must specify whether Cash is a supported payment type',
        },
        validateBoolean(value) {
          if (!validator.isBoolean(value + '')) {
            throw new Error('Cash is not a well formed boolean value');
          }
        },
      },
    },
    venmo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: 'You must specify whether Venmo is a supported payment type',
        },
        validateBoolean(value) {
          if (!validator.isBoolean(value + '')) {
            throw new Error('Venmo is not a well formed boolean value');
          }
        },
      },
    },
    zelle: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: 'You must specify whether Zelle is a supported payment type',
        },
        validateBoolean(value) {
          if (!validator.isBoolean(value + '')) {
            throw new Error('Zelle is not a well formed boolean value');
          }
        },
      },
    },
    otherPaymentMethod: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: 'You must specify whether Other payment methods are supported',
        },
        validateBoolean(value) {
          if (!validator.isBoolean(value + '')) {
            throw new Error(
              'Other payment method is not a well formed boolean value'
            );
          }
        },
      },
    },
    modeOfCommunication: {
      type: DataTypes.ENUM('Phone', 'GroupMe'),
      validate: {
        isIn: {
          args: [['Phone', 'GroupMe']],
          msg: 'Preferred mode of communication must be either Phone or GroupMe',
        },
        notNullIfPreferred(value) {
          if (value === 'Phone' && !this.phoneNumber) {
            throw new Error(
              'A phone number is required if Phone is the preferred means of communication'
            );
          } else if (value === 'GroupMe' && !this.groupMe) {
            throw new Error(
              'A GroupMe URL is required if GroupMe is the preferred means of communication'
            );
          }
        },
      },
    },
    phoneNumber: {
      type: DataTypes.CHAR(10),
      validate: {
        validatePhoneNumber(value) {
          if (value !== null && !validator.isMobilePhone(value + '', 'en-US')) {
            throw new Error('A valid US phone number is required');
          }
        },
      },
    },
    groupMe: {
      type: DataTypes.STRING,
      validate: {
        validateGroupMeURL(value) {
          if (
            value !== null &&
            !validator.isURL(value + '', {
              protocols: ['https'],
              require_protocol: true,
              host_whitelist: ['groupme.com', 'www.groupme.com'],
            })
          ) {
            throw new Error(
              'The provided URL must be from groupme.com and use https'
            );
          }
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const userId = await nanoid();
        user.setDataValue('id', userId);

        const password = user.getDataValue('password');
        user.setDataValue('password', await bcrypt.hash(password + '', 11));
      },
      beforeSave: async (user) => {
        if (user.changed('phoneNumber')) {
          const phoneNumber = (
            user.getDataValue('phoneNumber') + ''
          ).replaceAll(/[+\-()]/g, '');
          if (phoneNumber[0] === '1') {
            user.setDataValue('phoneNumber', phoneNumber.substring(1));
          } else {
            user.setDataValue('phoneNumber', phoneNumber);
          }
        }

        if (user.changed('password')) {
          const password = user.getDataValue('password');
          if ((password + '').length > 32) {
            throw new ValidationError(
              'Password must be between 8 to 32 characters long'
            );
          }

          user.setDataValue('password', await bcrypt.hash(password + '', 11));
        }
      },
    },
    sequelize,
    validate: {
      minOnePaymentMethod() {
        if (
          !(
            validator.toBoolean(this.cash + '') ||
            validator.toBoolean(this.venmo + '') ||
            validator.toBoolean(this.zelle + '') ||
            validator.toBoolean(this.otherPaymentMethod + '')
          )
        ) {
          throw new Error('Must support at least one payment method');
        }
      },
    },
    paranoid: true,
  }
);

module.exports = User;

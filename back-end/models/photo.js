const { DataTypes, Model } = require('sequelize');
const validator = require('validator');
const { nanoid } = require('nanoid/async');

const sequelize = require('./database');

class Photo extends Model {}

Photo.init(
    {
        id: {
            type: DataTypes.CHAR(21),
            primaryKey: true,
        },
        photoType: {
            type: DataTypes.ENUM('User', 'Product - Cover', 'Product - Other'),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Photo type is a required field for all photos',
                },
                isIn: {
                    args: [['User', 'Product - Cover', 'Product - Other']],
                    msg: 'Photo type must be either User, Product - Cover or Product - Other',
                },
            },
        },
        imageType: {
            type: DataTypes.ENUM('jpeg', 'png'),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Image type is a required field for all photos',
                },
                isIn: {
                    args: [['jpeg', 'png']],
                    msg: 'Image type must be either jpeg or png',
                },
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (photo) => {
                const photoId = await nanoid();
                photo.setDataValue('id', photoId);
            },
        },
        indexes: [
            {
                fields: ['photoType', 'parentId'],
            },
            {
                fields: ['parentId'],
            },
        ],
        sequelize,
        paranoid: true,
    }
);

module.exports = Photo;

const fs = require('fs')
const { DataTypes, Model } = require('sequelize');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync(process.env.JWT_KEY_PATH);
const sequelize = require('./database');

class Token extends Model {
    
}

Token.init({
    userId: {
        type: DataTypes.CHAR(21),
        primaryKey: true
    },
    jwt: {
        type: DataTypes.STRING(512),
        primaryKey: true
    }
}, {
    hooks: {
        beforeCreate: async (token) => {
            const _id = token.getDataValue('userId');
            const userToken = await jwt.sign({ _id }, privateKey, { expiresIn: '7d', algorithm: 'RS256' });

            console.log('Heya', typeof userToken);
            console.log(userToken);
            
            token.setDataValue('jwt', userToken);
        }
    },
    sequelize,
    paranoid: true
});

module.exports = Token;
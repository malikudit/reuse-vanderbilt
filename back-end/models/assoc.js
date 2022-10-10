const User = require('./user');
const Product = require('./product');

// a user can sell zero to many products but each product can only have one seller
User.hasMany(Product, { as: 'productsSold', foreignKey: 'sellerId' });
Product.belongsTo(User, { as: 'seller' });

// a user can buy zero to many products but each product can only have one buyer
User.hasMany(Product, { as: 'productsPurchased', foreignKey: 'buyerId' });
Product.belongsTo(User, { as: 'buyer' });

module.exports = {
    User,
    Product
};
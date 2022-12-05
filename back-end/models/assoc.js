const User = require('./user');
const Product = require('./product');
const Bid = require('./bid');
const Review = require('./review');
const Photo = require('./photo');

// a user can sell zero to many products but each product can only have one seller
User.hasMany(Product, {
  as: 'productsSold',
  foreignKey: {
    name: 'sellerId',
    allowNull: false,
  },
});
Product.belongsTo(User, { as: 'seller' });

// a user can buy zero to many products but each product can only have one buyer
User.hasMany(Product, { as: 'productsPurchased', foreignKey: 'buyerId' });
Product.belongsTo(User, { as: 'buyer' });

Product.hasMany(Bid, {
  foreignKey: {
    name: 'productId',
    allowNull: false,
  },
});
Bid.belongsTo(Product, { as: 'product' });

User.hasMany(Bid, {
  foreignKey: {
    name: 'bidderId',
    allowNull: false,
  },
});
Bid.belongsTo(User, { as: 'bidder' });

Product.hasOne(Review, {
  scope: {
    reviewType: 'Buyer',
  },
  as: 'buyerReview',
  foreignKey: {
    name: 'productId',
    allowNull: false,
  },
});

Product.hasOne(Review, {
  scope: {
    reviewType: 'Seller',
  },
  as: 'sellerReview',
  foreignKey: {
    name: 'productId',
    allowNull: false,
  },
});

Review.belongsTo(Product, { as: 'product' });

User.hasMany(Review, {
  as: 'reviewsGiven',
  foreignKey: {
    name: 'reviewerId',
    allowNull: false,
  },
});
Review.belongsTo(User, { as: 'reviewer' });

// Each user can receive many reviews for products they have sold
// While the review type will be buyer since the review was made by buyer,
// from the user's perspective it is a review for them as a seller
User.hasMany(Review, {
  scope: {
    reviewType: 'Buyer',
  },
  as: 'sellerReviews',
  foreignKey: {
    name: 'revieweeId',
    allowNull: false,
  },
});

// Each user can receive many reviews for products they have bought
// While the review type will be seller since the review was made by seller,
// from the user's perspective it is a review for them as a buyer
User.hasMany(Review, {
  scope: {
    reviewType: 'Seller',
  },
  as: 'buyerReviews',
  foreignKey: {
    name: 'revieweeId',
    allowNull: false,
  },
});

Review.belongsTo(User, { as: 'reviewee' });

User.hasOne(Photo, {
  scope: {
    photoType: 'User',
  },
  as: 'profilePicture',
  foreignKey: {
    name: 'parentId',
    allowNull: false,
  },
  constraints: false,
});

Product.hasOne(Photo, {
  scope: {
    photoType: 'Product - Cover',
  },
  as: 'coverPhoto',
  foreignKey: {
    name: 'parentId',
    allowNull: false,
  },
  constraints: false,
});

Product.hasMany(Photo, {
  scope: {
    photoType: 'Product - Other',
  },
  as: 'otherPhotos',
  foreignKey: {
    name: 'parentId',
    allowNull: false,
  },
  constraints: false,
});

module.exports = {
  User,
  Product,
  Bid,
  Review,
  Photo,
};

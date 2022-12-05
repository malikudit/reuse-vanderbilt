const _ = require("lodash");
const { DataTypes, Model } = require("sequelize");
const dayjs = require("dayjs");
const validator = require("validator");
const { nanoid } = require("nanoid/async");

const sequelize = require("./database");

const defaultFields = [
  "id",
  "sellerId",
  "title",
  "description",
  "category",
  "condition",
  "listingType",
  "listingPrice",
  "openBidPrice",
  "bidIncrement",
  "currentBid",
  "expirationDate",
  "location",
  "state,",
];

class Product extends Model {
  generateView(additionalFields = []) {
    return _.pick(this, defaultFields.concat(additionalFields));
  }
}

Product.init(
  {
    id: {
      type: DataTypes.CHAR(21),
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product title is a required field",
        },
        notIn: {
          args: [[true, false, NaN]],
          msg: "Product title must be alphanumeric",
        },
        is: {
          args: "[a-zA-Z0-9 ]*",
          msg: "Product title must be alphanumeric",
        },
        len: {
          args: [5, 32],
          msg: "Product title must be between 2 to 32 characters long",
        },
      },
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: true,
      validate: {
        notIn: {
          args: [[true, false, NaN]],
          msg: "Product description must be alphanumeric",
        },
        is: {
          args: "[a-zA-Z0-9 ]*",
          msg: "Product description must be alphanumeric",
        },
        len: {
          args: [20, 250],
          msg: "Product description must be between 20 to 250 characters long",
        },
      },
    },
    category: {
      type: DataTypes.ENUM(
        "Home",
        "Books",
        "Clothing",
        "Electronics",
        "Furniture",
        "Kitchen",
        "Tickets",
        "Transportation",
        "Other"
      ),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category is a required field for every product",
        },
        isIn: {
          args: [
            [
              "Home",
              "Books",
              "Clothing",
              "Electronics",
              "Furniture",
              "Kitchen",
              "Tickets",
              "Transportation",
              "Other",
            ],
          ],
          msg: "Category is not a valid option",
        },
      },
    },
    condition: {
      type: DataTypes.ENUM("New", "Like New", "Slightly Used", "Used"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Condition is a required field for every product",
        },
        isIn: {
          args: [["New", "Like New", "Slightly Used", "Used"]],
          msg: "Condition must be either New, Like New, Slightly Used or Used",
        },
      },
    },
    listingType: {
      type: DataTypes.ENUM("Listing-Only", "Bid-Only", "Bid-And-Buy-Now"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Listing type is a required field for every product",
        },
        isIn: {
          args: [["Listing-Only", "Bid-Only", "Bid-And-Buy-Now"]],
          msg: "Listing type must be either listing only or bidding with or without buy-now",
        },
        verifyListingPrice(value) {
          if (value === "Listing-Only" && !this.listingPrice) {
            throw new Error(
              "Listing price is a required field if you are selling at just a listing price"
            );
          }
        },
        verifyBuyNowPrice(value) {
          if (value === "Bid-And-Buy-Now" && !this.buyNow) {
            throw new Error(
              "Buy now price is a required field if you are allowing buy now with bidding"
            );
          }
        },
        verifyBiddingFields(value) {
          if (value === "Listing-Only") {
            return;
          }

          if (!this.openBidPrice) {
            throw new Error(
              "Open bid price is a required field if you are supporting bidding"
            );
          }
          if (!this.bidIncrement) {
            throw new Error(
              "Bid increment is a required field if you are supporting bidding"
            );
          }
          if (!this.currentBid) {
            throw new Error(
              "Current bid price is a required field if you are supporting bidding"
            );
          }
        },
      },
    },
    listingPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        isInt: {
          msg: "Listing price must be set in $1 increments",
        },
        min: {
          args: 5,
          msg: "Listing price must be atleast $5",
        },
        max: {
          args: 9999,
          msg: "Listing price must be less than $10,000",
        },
        dollarIncrements(value) {
          if (value !== null && !validator.isDivisibleBy(value + "", "1")) {
            throw new Error("Listing price must be set in $1 increments");
          }
        },
      },
    },
    openBidPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        isInt: {
          msg: "Opening bid price must be set in $1 increments",
        },
        min: {
          args: 5,
          msg: "Opening bid price must be atleast $5",
        },
        max: {
          args: 9999,
          msg: "Opening bid price must be less than $10,000",
        },
        dollarIncrements(value) {
          if (value !== null && !validator.isDivisibleBy(value + "", "1")) {
            throw new Error("Opening bid price must be set in $1 increments");
          }
        },
      },
    },
    bidIncrement: {
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        isInt: {
          msg: "Bid increment must be set in $1 increments",
        },
        min: {
          args: 1,
          msg: "Bid increment must be atleast $1",
        },
        max: {
          args: 1000,
          msg: "Bid increment must be less than $1,000",
        },
        dollarIncrements(value) {
          if (value !== null && !validator.isDivisibleBy(value + "", "1")) {
            throw new Error("Bid increment must be set in $1 increments");
          }
        },
      },
    },
    currentBid: {
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        isInt: {
          msg: "Current bid must be set in $1 increments",
        },
        min: {
          args: 5,
          msg: "Current bid must be atleast $5",
        },
        max: {
          args: 9999,
          msg: "Current bid must be less than $10,000",
        },
        dollarIncrements(value) {
          if (value !== null && !validator.isDivisibleBy(value + "", "1")) {
            throw new Error("Current bid must be set in $1 increments");
          }
        },
      },
    },
    buyNow: {
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        isInt: {
          msg: "Buy now price must be set in $1 increments",
        },
        min: {
          args: 5,
          msg: "Buy now price must be atleast $5",
        },
        max: {
          args: 9999,
          msg: "Buy now price must be less than $10,000",
        },
        dollarIncrements(value) {
          if (value !== null && !validator.isDivisibleBy(value + "", "1")) {
            throw new Error("Buy now price must be set in $1 increments");
          }
        },
      },
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Expiration date is a required field",
        },
        validDateTime(value) {
          if (!dayjs(value + "", "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid()) {
            throw new Error("Expiration date must be a valid ISO string");
          }
        },
        validRange(value) {
          const duration = dayjs(
            value + "",
            "YYYY-MM-DDTHH:mm:ss.SSSZ",
            true
          ).diff();
          if (duration < 0) {
            throw new Error("Expiration date can not be in the past");
          }

          const threeHours = 3 * 60 * 60 * 1000;
          const twoWeeks = 14 * 24 * 60 * 60 * 1000;
          if (duration < threeHours) {
            throw new Error(
              "Expiration date must be at least three hours from now"
            );
          }

          if (duration > twoWeeks) {
            throw new Error(
              "Expiration date can not be longer than 14 days in the future"
            );
          }
        },
      },
    },
    location: {
      type: DataTypes.ENUM(
        "Exchange at Common Point",
        "Buyer Comes to Seller",
        "Seller Delivers to Buyer"
      ),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Point of exchange is a required field for every product",
        },
        isIn: {
          args: [
            [
              "Exchange at Common Point",
              "Buyer Comes to Seller",
              "Seller Delivers to Buyer",
            ],
          ],
          msg: "Point of exchange is not a valid option",
        },
      },
    },
    state: {
      type: DataTypes.ENUM(
        "Active",
        "Inactive",
        "Evaluating Offers",
        "Booked",
        "Sold"
      ),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product must be in a valid state at all times",
        },
        isIn: {
          args: [["Active", "Inactive", "Evaluating Offers", "Booked", "Sold"]],
          msg: "State of the product must be either Active, Inactive, Evaluating Offers, Booked or Sold",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (product) => {
        const productId = await nanoid();
        product.setDataValue("id", productId);
      },
    },
    indexes: [
      {
        fields: [
          "state",
          {
            name: "expirationDate",
            order: "ASC",
          },
        ],
      },
      {
        fields: ["sellerId"],
      },
      {
        fields: ["buyerId"],
      },
    ],
    sequelize,
    paranoid: true,
  }
);

module.exports = Product;

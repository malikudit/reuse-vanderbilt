import React from "react";
import { Link } from "react-router-dom";
import "./ProductCards.css";
import TimeAgo from "react-timeago";
import CountdownTimer from "./CountdownTimer";

const ProductCards = ({
  image = "",
  itemName = "",
  description = "",
  seller = "",
  condition = "",
  location = "",
  currentBid = "$",
  buyNow = "$",
  expirationDate = "",
  category = "",
}) => (
  <Link
    to={{
      pathname: `/product_listing/${category.toLowerCase()}/${itemName}`,
    }}
    state={{
      image: image,
      itemName: itemName,
      description: description,
      seller: seller,
      condition: condition,
      location: location,
      currentBid: currentBid,
      buyNow: buyNow,
      expirationDate: expirationDate,
      category: category,
    }}
    style={{ textDecoration: "none" }}
  >
      <div className="card">
        <div className="top">
          <img src={image} alt="product" />
          <div className="overlay">
            <div className="condition">
              {condition}
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="categoryBar">
            <div className="category">
              {category}
            </div>
            <div className="time_left">
                <CountdownTimer countDownDate={expirationDate} />
            </div>
          </div>
          <div className="title">
            {itemName}
          </div>
          <div className="price">
            <div className="item">
              <div className="value">
                {currentBid}
              </div>
              <div className="label">
                Current Bid
              </div>
            </div>
            <div className="item">
              <div className="value">
                {buyNow}
              </div>
              <div className="label">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
  </Link>
);

export default ProductCards;

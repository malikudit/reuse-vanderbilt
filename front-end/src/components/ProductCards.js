import React from "react";
import { Link } from "react-router-dom";
import "./ProductCards.css";
import CountdownTimer from "./CountdownTimer";

const ProductCards = ({
  image = "",
  productID = "",
  itemName = "",
  description = "",
  seller = "",
  condition = "",
  location = "",
  listingType = "",
  currentBid = "$",
  bidIncrement = "$",
  buyNow = "$",
  listingPrice = "$",
  openBidPrice = "$",
  expirationDate = "",
  category = "",
  sellerID = "",
}) => (
  <Link
    to={{
      pathname: `/product_listing/${itemName}`,
    }}
    state={{
      image: image,
      productID: productID,
      itemName: itemName,
      description: description,
      seller: seller,
      condition: condition,
      location: location,
      listingType: listingType,
      currentBid: currentBid,
      bidIncrement: bidIncrement,
      buyNow: buyNow,
      listingPrice: listingPrice,
      openBidPrice: openBidPrice,
      expirationDate: expirationDate,
      category: category,
      sellerID: sellerID,
    }}
    style={{ textDecoration: "none" }}
  >
    <div className="card">
      <div className="top">
        <img src={image} alt="product" />
        <div className="overlay">
          <div className="condition">{condition}</div>
        </div>
      </div>
      <div className="bottom">
        <div className="categoryBar">
          <div className="category">{category}</div>
          <div className="time_left">
            <CountdownTimer countDownDate={expirationDate} />
          </div>
        </div>
        <div className="title">{itemName}</div>
        <div className="price">
          {listingType === "Bid-And-Buy-Now" ? (
            <React.Fragment>
              <div className="item">
                <div className="value">{currentBid}</div>
                <div className="label">Current Bid</div>
              </div>
              <div className="item">
                <div className="value">{buyNow}</div>
                <div className="label">Buy Now</div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {listingType === "Bid-Only" ? (
                <div className="item">
                  <div className="value">{currentBid}</div>
                  <div className="label">Current Bid</div>
                </div>
              ) : (
                <div className="item">
                  <div className="value">{listingPrice}</div>
                  <div className="label">Listing Price</div>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  </Link>
);

export default ProductCards;

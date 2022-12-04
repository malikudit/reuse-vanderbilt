import React from "react";
import { Link } from "react-router-dom";
import "../css/ProductCards.css";
import CountdownTimer from "./CountdownTimer";

const ProductCards = ({
  coverImage = "",
  secondaryImage1 = "",
  secondaryImage2 = "",
  secondaryImage3 = "",
  secondaryImage4 = "",
  productID = "",
  title = "",
  description = "",
  seller = "",
  condition = "",
  location = "",
  listingType = "",
  openingBid = "$",
  currentBid = "$",
  bidIncrement = "$",
  listingPrice = "$",
  expirationDate = "",
  category = "",
  sellerID = "",
  state = "",
  role = "",
}) => (
  <Link
    to={{
      pathname: `/product_listing/${title}`,
    }}
    state={{
      coverImage: coverImage,
      secondaryImage1: secondaryImage1,
      secondaryImage2: secondaryImage2,
      secondaryImage3: secondaryImage3,
      secondaryImage4: secondaryImage4,
      productID: productID,
      title: title,
      description: description,
      seller: seller,
      condition: condition,
      location: location,
      listingType: listingType,
      currentBid: currentBid,
      bidIncrement: bidIncrement,
      openingBid: openingBid,
      listingPrice: listingPrice,
      expirationDate: expirationDate,
      category: category,
      sellerID: sellerID,
      state: state,
      role: role,
    }}
    style={{ textDecoration: "none" }}
  >
    <div className="card">
      <div className="top">
        <img src={coverImage} alt="product" />
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
        <div className="title">{title}</div>
        <div className="price">
          {listingType === "Bid Only" ? (
            <React.Fragment>
              {currentBid === null ? (
                <React.Fragment>
                  <div className="item">
                    <div className="value">
                      {"$"}
                      {openingBid}
                    </div>
                    <div className="label">Starting Bid</div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="item">
                    <div className="value">
                      {"$"}
                      {currentBid}
                    </div>
                    <div className="label">Current Bid</div>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="item">
                <div className="value">
                  {"$"}
                  {listingPrice}
                </div>
                <div className="label">Listing Price</div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  </Link>
);

export default ProductCards;

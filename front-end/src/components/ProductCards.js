import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ProductCards.css';
import CountdownTimer from './CountdownTimer';

const ProductCards = ({
  coverPhoto = '',
  id = '',
  title = '',
  condition = '',
  listingType = '',
  openBidPrice = '$',
  currentBid = '$',
  bidIncrement = '$',
  listingPrice = '$',
  expirationDate = '',
  category = '',
  sellerID = '',
  state = '',
}) => (
  <Link
    to={{
      pathname: `/product_listing/${id}`,
    }}
    state={{
      coverPhoto: coverPhoto,
      id: id,
      title: title,
      condition: condition,
      listingType: listingType,
      currentBid: currentBid,
      bidIncrement: bidIncrement,
      openBidPrice: openBidPrice,
      listingPrice: listingPrice,
      expirationDate: expirationDate,
      category: category,
      sellerID: sellerID,
      state: state,
    }}
    style={{ textDecoration: 'none' }}
  >
    <div className="card">
      <div className="top">
        <img src={coverPhoto} alt="product" />
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
          {listingType === 'Bid Only' ? (
            <React.Fragment>
              {currentBid === null ? (
                <React.Fragment>
                  <div className="item">
                    <div className="value">
                      {'$'}
                      {openBidPrice}
                    </div>
                    <div className="label">Starting Bid</div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="item">
                    <div className="value">
                      {'$'}
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
                  {'$'}
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

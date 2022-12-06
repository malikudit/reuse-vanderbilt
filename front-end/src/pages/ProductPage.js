import { React, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DefaultBanner from '../components/DefaultBanner';
import Active from './product_pages/Active';
import Inactive from './product_pages/Inactive';
import EvaluatingOffers from './product_pages/EvaluatingOffers';
import Sold from './product_pages/Sold';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DAA520',
    },
    secondary: {
      main: '#212121',
    },
    neutral: {
      main: '#ffffff',
    },
    info: {
      main: '#4169E1',
    },
    success: {
      main: '#228B22',
    },
    background: {
      default: '#696969',
    },
  },
});

export default function ProductPage() {
  const [products, setProducts] = useState({});
  const url = window.location.href;
  const array = url.split('/');
  const id = array[array.length - 1];

  async function getData(url = `https://api.reusevandy.org/product/${id}`) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        var d = data;
        setProducts(d);
      });
    return response;
  }

  useEffect(() => {
    getData();
  }, []);
  var currentBid = products.currentBid;
  const coverImage = products.coverImage;
  const secondaryImage1 = products.coverImage;
  const secondaryImage2 = products.coverImage;
  const secondaryImage3 = products.coverImage;
  const secondaryImage4 = products.coverImage;
  const title = products.title;
  const description = products.description;
  const condition = products.condition;
  const category = products.category;
  const status = products.status;
  const sellerName = products.sellerName;
  const sellerId = products.sellerId;
  const listingType = products.listingType;
  const location = products.location;
  const openingBid = products.openingBid;
  const bidIncrement = products.bidIncrement;
  const listingPrice = products.listingPrice;
  const timeLeft = new Date(products.expirationDate).getTime();
  var state = products.state;
  const role = products.role;
  //   state = 'Sold';

  if (currentBid === null) {
    currentBid = openingBid;
  }
  const nextBid = currentBid + ' + ' + bidIncrement;
  var now = new Date().getTime();
  var expired = timeLeft - now;

  if (state === 'Active') {
    return (
      <ThemeProvider theme={theme}>
        <DefaultBanner banner={'Product Listing Page'} />
        <Active sellerID={sellerId} id={id} />
      </ThemeProvider>
    );
  }

  if (state === 'Inactive') {
    return (
      <ThemeProvider theme={theme}>
        <DefaultBanner banner={'Product Listing Page'} />
        <Inactive
          coverImage={coverImage}
          secondaryImage1={secondaryImage1}
          secondaryImage2={secondaryImage2}
          secondaryImage3={secondaryImage3}
          secondaryImage4={secondaryImage4}
          itemName={title}
          sellerID={sellerId}
          description={description}
          sellerName={sellerName}
          id={id}
        />
      </ThemeProvider>
    );
  }

  if (state === 'Evaluating Offers') {
    return (
      <ThemeProvider theme={theme}>
        <DefaultBanner banner={'Product Listing Page'} />
        <EvaluatingOffers
          coverImage={coverImage}
          secondaryImage1={secondaryImage1}
          secondaryImage2={secondaryImage2}
          secondaryImage3={secondaryImage3}
          secondaryImage4={secondaryImage4}
          itemName={title}
          sellerID={sellerId}
          sellerName={sellerName}
          category={category}
          condition={condition}
          location={location}
          description={description}
          role={role}
          id={id}
        />
      </ThemeProvider>
    );
  }

  if (state === 'Sold') {
    return (
      <ThemeProvider theme={theme}>
        <DefaultBanner banner={'Product Listing Page'} />
        <Sold id={id} sellerId={sellerId} />
      </ThemeProvider>
    );
  }
}

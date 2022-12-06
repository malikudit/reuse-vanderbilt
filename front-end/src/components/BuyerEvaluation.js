import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';

export default function BuyerEvaluation(props) {
  const [products, setProducts] = useState([]);
  async function getData(url = `http://localhost:8080/product/${props.id}`) {
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

  var message = 'Congrats! You are the highest bidder! Your bid was $';
  var price;
  if (products.listingType === 'Bid Only') {
    price = products.currentBid;
  } else {
    price = products.listingPrice;
  }

  return (
    <div>
      <Grid item xs={12} marginBottom={2} marginTop={2}>
        <Typography
          variant="h6"
          style={{ color: '#228B22', fontWeight: 'bold' }}
        >
          {message}
          {price}.
        </Typography>
        <Typography
          variant="h6"
          style={{ color: '#228B22', fontWeight: 'bold' }}
        >
          Contact the seller at the following information to coordinate the
          transaction:
        </Typography>
      </Grid>
      <Grid item xs={12} marginBottom={2} marginTop={2} borderBottom={2}>
        <Typography
          component={Link}
          to={`/profile/${products.sellerId}`}
          variant="h6"
        >
          Seller Name:
          {' ' + products.sellerName}
        </Typography>
      </Grid>
      <Grid item xs={12} marginBottom={2} borderBottom={2}>
        <Typography variant="h9" sx={{ color: '#FF0000' }}>
          Note: The seller can still reject your bid if you are unable to
          coordinate the exchange in a timely manner.
        </Typography>
      </Grid>
    </div>
  );
}

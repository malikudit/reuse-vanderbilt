import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@mui/material';
import BuyerEvaluation from '../../components/BuyerEvaluation';
import SellerEvaluation from '../../components/SellerEvaluation';

export default function EvaluatingOffers(props) {
  const [products, setProducts] = useState([]);

  async function getData(
    url = `https://api.reusevandy.org/product/${props.id}`
  ) {
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
  return (
    <Grid
      align={'center'}
      padding={4}
      marginLeft={2}
      marginRight={2}
      sx={{
        boxShadow: '0 0 5px #ccc',
        margin: '10vh',
        width: '90vw',
        height: 'auto',
        paddingBottom: '7vh',
      }}
    >
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                maxHeight: '75vh',
                maxWidth: '75vw',
              }}
              src={products.coverPhoto}
            />
          </Grid>
          <Grid item xs={7} direction="column" marginTop={2}>
            {products.role === 'Highest bidder' ? (
              <BuyerEvaluation
                id={props.id}
                sellerName={products.sellerName}
                sellerId={products.sellerId}
              />
            ) : products.role === 'Seller' ? (
              <SellerEvaluation
                id={props.id}
                buyerName={products.buyerName}
                buyerId={products.buyerId}
              />
            ) : products.role === 'Other Bidder' ? (
              <Typography variant="h5">
                You aren't the highest bidder, but should the higher bids be
                rejected, you will become the highest bidder.
              </Typography>
            ) : products.role === 'Bid Rejected' ? (
              <Typography variant="h5">
                Your bid was rejected by the seller.
              </Typography>
            ) : (
              products.role ===
              'Other'(
                <Typography variant="h5">
                  This product is no longer accepting offers.
                </Typography>
              )
            )}
            <Grid item xs={2} marginTop={2} marginBottom={2}>
              <Typography
                variant="h5"
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                {products.title}
              </Typography>
            </Grid>
            <Grid
              container
              marginBottom={1}
              sx={{
                maxWidth: '40vw',
              }}
            >
              <Grid item xs={12} marginBottom={1} marginTop={1}>
                <Typography
                  component={Link}
                  to={`/profile/${products.sellerId}`}
                  style={{ color: '#4169E1' }}
                  variant="p"
                >
                  {'Seller: '}
                  {products.sellerName}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              marginBottom={1}
              sx={{
                maxWidth: '40vw',
              }}
            >
              <Grid item xs={12} marginBottom={1} marginTop={1}>
                <Typography variant="p">
                  {'Exchange location: '}
                  {products.location}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              marginBottom={1}
              sx={{
                maxWidth: '40vw',
              }}
            >
              <Grid item xs={12} marginBottom={1} marginTop={1}>
                <Typography variant="p">{products.description}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

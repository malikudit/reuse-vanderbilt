import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@mui/material';

export default function Sold(props) {
  const [products, setProducts] = useState([]);
  // Edit this
  const leftReview = false;
  var exchangePartner;

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

  var userID;
  if (products.role === 'Seller') {
    userID = products.buyerId;
    exchangePartner = products.buyerName;
  } else {
    userID = products.sellerId;
    exchangePartner = products.sellerName;
  }

  var salePrice;
  if (products.listingType === 'Bid Only') {
    salePrice = products.currentBid;
  } else {
    salePrice = products.listingPrice;
  }

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
            <Grid item xs={12} marginBottom={2} marginTop={2}>
              <Typography
                variant="h6"
                style={{ color: '#228B22', fontWeight: 'bold' }}
              >
                Sale completed!
              </Typography>
              <Typography
                variant="h6"
                style={{ color: '#228B22', fontWeight: 'bold' }}
              >
                Contact the individual you are exchanging with at the following:
              </Typography>
            </Grid>
            <Grid item xs={12} marginBottom={2} marginTop={2}>
              <Typography
                component={Link}
                to={`/profile/${userID}`}
                variant="h6"
              >
                Person exchanging with:
                {' ' + exchangePartner}
              </Typography>
              {products.role === 'Buyer' || products.role === 'Seller' ? (
                <Typography variant="h6" style={{ color: '#4169E1' }}>
                  Sale price: ${salePrice}
                </Typography>
              ) : null}
            </Grid>
            <Grid container justifyContent={'center'}>
              <Grid marginBottom={2}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    background: 'white',
                    text: 'black',
                    outline: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '10px 25px',
                  }}
                >
                  {leftReview ? (
                    <Link
                      to={{ pathname: `/profile/${products.sellerId}` }}
                      style={{ textDecoration: 'none' }}
                    >
                      View Profile of {products.role}
                    </Link>
                  ) : (
                    <Link
                      to={{ pathname: `/new_review/${products.id}` }}
                      state={{
                        itemName: products.title,
                        coverImage: products.coverImage,
                        sellerID: products.sellerId,
                        sellerName: products.sellerName,
                        category: products.category,
                        condition: products.condition,
                        location: products.location,
                        currentPrice: products.salePrice,
                        id: products.id,
                      }}
                      style={{ textDecoration: 'none' }}
                    >
                      Leave a Review
                    </Link>
                  )}
                </Button>
              </Grid>
            </Grid>
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
                  to={`/profile/${props.sellerId}`}
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

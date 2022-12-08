import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@mui/material';
import swal from 'sweetalert';

export default function Sold(props) {
  const [products, setProducts] = useState([]);
  var leftReview = false;
  var userID;
  var exchangePartner;
  var opRole;
  var message = '';

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
        if (data.error) {
          swal('Oops!', data.error, 'error');
        } else {
          var d = data;
          setProducts(d);
        }
      });
    return response;
  }

  useEffect(() => {
    getData();
  }, []);

  if (products.role === 'Seller') {
    userID = products.buyerId;
    exchangePartner = products.buyerName;
    if (products.sellerReview) {
      leftReview = true;
    }
    opRole = 'Buyer';
  } else if (products.role === 'Buyer') {
    userID = products.sellerId;
    exchangePartner = products.sellerName;
    if (products.buyerReview) {
      leftReview = true;
    }
    opRole = 'Seller';
  } else if (
    products.role === 'Bid Rejected' ||
    products.role === 'Other Bid Accepted'
  ) {
    message = 'Your bid was unfortunately not accepted.';
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
            {console.log(products)}
          </Grid>
          <Grid item xs={7} direction="column" marginTop={2}>
            {products.role === 'Buyer' || products.role === 'Seller' ? (
              <div>
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
                    Contact the individual you are exchanging with at the
                    following:
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

                  <Typography variant="h6" style={{ color: '#228B22' }}>
                    Sale price: ${salePrice}
                  </Typography>
                </Grid>
              </div>
            ) : message !== '' ? (
              <Typography variant="h6" style={{ color: '#228B22' }}>
                {message}
              </Typography>
            ) : (
              <Typography variant="h6" style={{ color: '#228B22' }}>
                This product has been sold.
              </Typography>
            )}
            <Grid container justifyContent={'center'}>
              <Grid marginBottom={2}>
                {products.role === 'Buyer' || products.role === 'Seller' ? (
                  <div>
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
                          View Profile of {opRole}
                        </Link>
                      ) : (
                        <Link
                          to={{ pathname: `/new_review/${products.id}` }}
                          state={{
                            sellerID: products.sellerId,
                            id: products.id,
                          }}
                          style={{ textDecoration: 'none' }}
                        >
                          Leave a Review
                        </Link>
                      )}
                    </Button>
                  </div>
                ) : null}
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

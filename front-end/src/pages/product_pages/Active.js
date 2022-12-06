import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import CountdownTimer from '../../components/CountdownTimer';
import swal from 'sweetalert';

export default function Active(props) {
  const [products, setProducts] = useState([]);
  var [bid, setBid] = useState();
  const role = 'Buyer';
  var madeBid = false;
  var message;

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

  if (products.role === 'Already Bid') {
    madeBid = true;
    message = 'You have already made an offer on this product!';
  } else if (products.role === 'Highest bidder') {
    madeBid = true;
    message = 'You are currently the highest bidder on this product!';
  } else if (products.role === 'Outbid') {
    madeBid = true;
    message =
      'You have been outbid on this product! Press bid to make a new offer.';
  }
  if (products.currentBid === null) {
    products.nextBid = products.openBidPrice;
  } else {
    products.nextBid = products.currentBid + ' + ' + products.bidIncrement;
  }
  const oneDay = 24 * 60 * 60 * 1000;

  var timeLeft =
    new Date(products.expirationDate).getTime() - new Date().getTime();
  var delListing = false;

  if (timeLeft > oneDay) {
    delListing = true;
  }

  const handleBidorOffer = async () => {
    if (products.listingType === 'Bid Only') {
      if (products.currentBid === null) {
        bid = products.openBidPrice;
      } else {
        const newBid = products.currentBid + products.bidIncrement;
        bid = newBid;
      }
    }
    putBidorOffer().then((data) => {
      if (data.error) {
        swal('Oops!', data.error, 'error');
      } else {
        if (products.listingPrice === 'Bid Only') {
          var message = 'Your bid has been placed!';
        } else {
          var message = 'Your offer has been placed!';
        }
        swal('Success!', message, 'success');
        window.location.reload(false);
      }
    });
    async function putBidorOffer(
      url = `http://localhost:8080/bid/${props.id}`
    ) {
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
          bidAmount: bid,
        }),
      });
      return response;
    }
  };

  const handleWithdrawBid = async () => {
    deleteWithdrawBid().then((data) => {
      if (data.error) {
        swal('Oops!', data.error, 'error');
      } else {
        swal(
          'Success!',
          'You have successfully withdrawn your bid!',
          'success'
        );
        window.location.reload(false);
      }
    });
    async function deleteWithdrawBid(
      url = `http://localhost:8080/bid/${props.id}`
    ) {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
      });
      return response;
    }
  };

  const handleDeleteListing = async () => {
    deleteListing().then((data) => {
      if (data.error) {
        swal('Oops!', data.error, 'error');
        console.log('error');
      } else {
        swal('Success!', 'You have deleted your listing!', 'success');
        window.location.href = '/';
      }
    });
    async function deleteListing(
      url = `http://localhost:8080/product/${props.id}`
    ) {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
      });
      return response;
    }
  };
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
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          <Grid item xs={5}>
            <Box
              component="img"
              sx={{
                width: '35vw',
                height: '100%',
                overflow: 'hidden',
                display: 'block',
              }}
              src={products.coverPhoto}
            />
          </Grid>
          <Grid
            item
            xs={7}
            direction="column"
            marginTop={2}
            sx={{
              maxWidth: '50vw',
              maxHeight: '60vh',
            }}
          >
            <Grid
              item
              xs={2}
              marginBottom={2}
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '15px',
                justifyItems: 'center',
                maxWidth: '80%',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                {products.title}
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={6} marginBottom={2}>
                <Typography
                  component={Link}
                  to={`/profile/${products.sellerId}`}
                  style={{ color: '#4169E1' }}
                >
                  {'Seller: '}
                  {products.sellerName}
                </Typography>
              </Grid>
              <Grid item xs={5.9} marginBottom={2}>
                <Typography style={{ color: '#4169E1' }}>
                  {'Category: '}
                  {products.category}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={6} marginBottom={2}>
                <Typography>
                  {'Condition: '}
                  {products.condition}
                </Typography>
              </Grid>
              <Grid item xs={6} marginBottom={2}>
                <Typography>
                  {'Location of Exchange: '}
                  {products.location}
                </Typography>
              </Grid>
            </Grid>
            <Grid container marginBottom={2}>
              <Grid
                item
                xs={12}
                marginBottom={5}
                marginTop={2}
                sx={{
                  maxWidth: '40vw',
                  justifyContent: 'left',
                  justifyItems: 'left',
                  alignText: 'left',
                }}
              >
                <Typography variant="p" sx={{ lineHeight: '1.5' }}>
                  {products.description}
                </Typography>
              </Grid>
              <Grid item xs={12} marginBottom={2}>
                <Typography
                  style={{
                    color: '#FF0000',
                    fontWeight: 'bold',
                  }}
                >
                  <CountdownTimer
                    countDownDate={products.expirationDate}
                    productPage={true}
                  />
                </Typography>
              </Grid>
            </Grid>
            {products.listingType === 'Bid Only' ? (
              <Grid container>
                <Grid item xs={6} marginBottom={2}>
                  <Typography
                    style={{
                      color: '#4169E1',
                      fontWeight: 'bold',
                    }}
                  >
                    {'Current Bid Placed: $'}
                    {products.currentBid}
                  </Typography>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                  <Typography
                    style={{
                      color: '#4169E1',
                      fontWeight: 'bold',
                    }}
                  >
                    {'Next Bid: $'}
                    {products.nextBid}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <div>
                <Grid item xs={6} marginBottom={2}>
                  <Typography
                    style={{
                      color: '#228B22',
                      fontWeight: 'bold',
                    }}
                  >
                    {'Listing Price: $'}
                    {products.listingPrice}
                  </Typography>
                </Grid>
              </div>
            )}
            <Grid item xs={6} marginBottom={2}>
              <Typography
                style={{
                  color: '#4169E1',
                  fontWeight: 'bold',
                }}
              >
                {message}
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between" marginBottom={2}>
              {products.role !== 'Seller' ? (
                <Grid
                  container
                  justifyContent={'space-evenly'}
                  marginBottom={2}
                >
                  {products.listingType === 'Bid Only' ? (
                    <div>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={handleBidorOffer}
                        sx={{
                          background: '#333',
                          color: 'white',
                          outline: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '10px 25px',
                        }}
                      >
                        Place Bid
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        background: '#333',
                        color: 'white',
                        outline: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '10px 25px',
                      }}
                      onClick={handleBidorOffer}
                    >
                      Make Offer
                    </Button>
                  )}
                  {madeBid ? (
                    <Button
                      variant="contained"
                      color="info"
                      sx={{
                        background: '#333',
                        color: 'white',
                        outline: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '10px 25px',
                      }}
                      onClick={handleWithdrawBid}
                    >
                      Withdraw Bid
                    </Button>
                  ) : null}
                </Grid>
              ) : (
                <Grid
                  container
                  justifyContent={'space-evenly'}
                  marginBottom={2}
                >
                  {delListing ? (
                    <Grid
                      container
                      justifyContent={'space-evenly'}
                      marginBottom={2}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          background: 'error',
                          color: 'white',
                          outline: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '10px 25px',
                        }}
                        onClick={handleDeleteListing}
                      >
                        Delete Listing
                      </Button>
                    </Grid>
                  ) : null}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

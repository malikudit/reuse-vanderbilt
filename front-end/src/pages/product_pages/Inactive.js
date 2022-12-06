import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button, Box } from '@mui/material';

export default function Inactive(props) {
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

  var message;
  if (products.role === 'Seller') {
    message =
      'Your product is inactive. You either de-listed your product or it received no valid offers. Would you like to relist your product?';
  } else {
    message =
      "This sale is inactive. The seller either de-listed the product or it didn't receive any valid offers.";
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
            maxHeight: '50vh',
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
            <Grid item xs={12} marginBottom={2}>
              <Typography
                component={Link}
                to={`/profile/${products.sellerId}`}
                variant="h6"
                style={{ color: '#4169E1' }}
              >
                {'Seller: '}
                {products.sellerName}
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
            <Typography variant="p" sx={{ lineHeight: '1.5' }}>
              {message}
            </Typography>
          </Grid>
          {products.role === 'Seller' ? (
            <Grid container justifyContent={'space-evenly'} marginBottom={2}>
              <Button
                component={Link}
                to="/listings"
                variant="contained"
                color="success"
                sx={{
                  background: 'error',
                  color: 'white',
                  outline: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px 25px',
                }}
              >
                Relist Product
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}

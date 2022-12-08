import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DefaultBanner from '../components/DefaultBanner';
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import swal from 'sweetalert';

export default function NewReviewPage(props) {
  const [products, setProducts] = useState([]);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewStars, setReviewStars] = useState(undefined);
  const [reviewBody, setReviewBody] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [starsError, setStarsError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [error, setError] = useState(false);
  const [printErr, setPrintErr] = useState('');

  const url = window.location.href;
  const array = url.split('/');
  const productID = array[array.length - 1];
  var salePrice;
  if (products.listingType === 'Bid Only') {
    salePrice = products.bidPrice;
  } else {
    salePrice = products.listingPrice;
  }

  async function getData(
    url = `https://api.reusevandy.org/product/${productID}`
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError(false);
    setStarsError(false);
    setBodyError(false);

    if (
      reviewTitle === '' ||
      reviewTitle.length > 32 ||
      reviewTitle.length < 5
    ) {
      setTitleError(true);
      setError(true);
    }
    if (reviewStars === undefined) {
      setStarsError(true);
      setError(true);
    }
    if (reviewBody === '' || reviewBody.length > 250) {
      setBodyError(true);
      setError(true);
    }

    const obj = {};
    obj.title = reviewTitle;
    obj.stars = reviewStars;
    obj.stars = parseFloat(obj.stars, 10);
    console.log(obj.stars);
    obj.body = reviewBody;

    if (!error) {
      console.log('Object is ' + obj);
      async function postData(
        url = `https://api.reusevandy.org/review/${products.id}`,
        data = obj
      ) {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          body: JSON.stringify({
            ...data,
          }),
        });
        return response;
      }

      postData(`https://api.reusevandy.org/review/${products.id}`, obj).then(
        (data) => {
          if (data.error) {
            setPrintErr(data.error);
            swal('Error', data.error, 'error');
            window.location.reload(false);
          } else {
            alert('Review Added Successfully!');
            window.location.href = '/';
          }
        }
      );
    }
  };

  return (
    <div>
      <DefaultBanner banner={'Review Page'} />
      <Grid align={'center'} padding={4} marginLeft={2} marginRight={2}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
            <Grid xs={7} direction="column" marginTop={2}>
              <Grid item marginBottom={2}>
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
              <Grid container justifyContent={'space-between'}>
                <Grid item xs={12} marginBottom={2}>
                  <Typography
                    component={Link}
                    to={`/profile/${products.sellerId}`}
                    style={{ color: '#4169E1' }}
                  >
                    {'Seller: '}
                    {products.sellerName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent={'space-between'}>
                <Grid item xs={12} marginBottom={2}>
                  <Typography style={{ color: '#228B22' }}>
                    {'Sale Price: '}
                    {salePrice}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="center"
                xs={10}
                marginBottom={5}
                marginTop={2}
              >
                <Grid xs={12} marginBottom={2}>
                  <TextField
                    fullWidth
                    label="Review Title"
                    onChange={(event) => setReviewTitle(event.target.value)}
                    error={titleError}
                  />
                </Grid>
                <Grid xs={12} marginBottom={2}>
                  <Typography>Rate your exchange experience!</Typography>
                  {starsError ? (
                    <Typography style={{ color: 'red' }}>
                      {'Please select a rating'}
                    </Typography>
                  ) : null}
                  <Rating
                    precision={0.5}
                    onChange={(newValue) => {
                      setReviewStars(newValue.target.value);
                    }}
                    error={starsError}
                  />
                </Grid>
                <Grid xs={12} marginBottom={2}>
                  <TextField
                    fullWidth
                    label="Review Body"
                    multiline
                    rows={10}
                    onChange={(event) => setReviewBody(event.target.value)}
                    error={bodyError}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={'space-around'} marginTop={4}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Save Review
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
}

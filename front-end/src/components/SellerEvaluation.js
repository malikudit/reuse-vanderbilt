import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import swal from 'sweetalert';

export default function SellerEvaluation(props) {
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

  const handleAccept = async () => {
    acceptBid().then((data) => {
      if (data.error) {
        swal('Oops!', data.error, 'error');
      } else {
        if (products.listingPrice === 'Bid Only') {
          var message = 'You have accepted the bid!';
        } else {
          var message = 'Your have accepted the offer!';
        }
        swal('Success!', message, 'success');
        // window.location.reload(false);
      }
    });
    async function acceptBid(
      url = `http://localhost:8080/bid/${props.id}/accept`
    ) {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        redirect: 'follow',
      });
      return response;
    }
  };

  const handleReject = () => {
    rejectBid().then((data) => {
      if (data.error) {
        swal('Oops!', data.error, 'error');
      } else {
        if (products.listingPrice === 'Bid Only') {
          var message = 'You have rejected the bid!';
        } else {
          var message = 'Your have rejected the offer!';
        }
        swal('Success!', message, 'success');
        // window.location.reload(false);
      }
    });
    async function rejectBid(
      url = `http://localhost:8080/bid/${props.id}/reject`
    ) {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        redirect: 'follow',
      });
      return response;
    }
  };

  var message = 'Congrats! You have received an offer(s)! The offer is $';
  var price;
  if (products.listingType === 'Bid Only') {
    price = products.currentBid;
  } else {
    price = products.listingPrice;
  }

  return (
    <Grid container>
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
          Contact the buyer at the following information to coordinate the
          transaction:
        </Typography>
      </Grid>
      <Grid item xs={12} marginBottom={2} marginTop={2} borderBottom={2}>
        <Typography
          component={Link}
          to={`/profile/${products.bidderId}`}
          variant="h6"
        >
          Buyer Name:
          {' ' + products.bidderName}
        </Typography>
      </Grid>
      <Grid item xs={12} marginBottom={2} borderBottom={2}>
        <Typography variant="h9" sx={{ color: '#FF0000' }}>
          Note: You can still reject the offer if the buyer is unable to
          coordinate the exchange in a timely manner or if they do not meet your
          terms of sale. However, if you reject the offer, there is no guarantee
          that you will have other offers to fall back on.
        </Typography>
        <Grid
          container
          justifyContent={'space-evenly'}
          marginTop={2}
          marginBottom={2}
        >
          <Button variant="contained" color="error" onClick={handleReject}>
            Decline Offer
          </Button>
          <Button variant="contained" color="success" onClick={handleAccept}>
            Accept Offer
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

import { React, useState, useEffect, useLocation } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, ThemeProvider, createTheme } from '@mui/material';
import DefaultBanner from '../components/DefaultBanner';
import ReviewCards from '../components/ReviewCards';
import '../css/Profile.css';
import Anonymous from '../assets/Anonymous.png';

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

export default function OtherProfile() {
  var [profile, setProfile] = useState([]);
  var [reviews, setReviews] = useState([]);
  let preferredPayment = [];
  const url = window.location.href;
  const array = url.split('/');
  const userID = array[array.length - 1];

  async function getData(url = `https://api.reusevandy.org/users/${userID}`) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        var d = data;
        setProfile(d);
        profile = d;
      })
      .then(() => {
        getReviews();
      });

    return response.json();
  }

  async function getReviews(
    url = `https://api.reusevandy.org/review/${userID}`
  ) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        var d = data;
        setReviews(d);
        reviews = d;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  useEffect(() => {
    getData();
  }, []);

  if (profile.cash) {
    preferredPayment.push('Cash');
  }
  if (profile.venmo) {
    preferredPayment.push('Venmo');
  }
  if (profile.zelle) {
    preferredPayment.push('Zelle');
  }

  return (
    <div class="container-profile">
      <ThemeProvider theme={theme}>
        <DefaultBanner banner={'User Profile'} />
        <div class="row profile">
          <form autoComplete="off">
            <Grid xs={3}>
              <div class="profile-sidebar">
                <div class="profile-userpic">
                  <img src={Anonymous} alt="" />
                </div>
                <div class="profile-usertitle">
                  <div class="profile-usertitle-name">
                    <h2 class="profile-desc-title">
                      {profile.firstName} {profile.lastName}
                    </h2>
                  </div>
                </div>

                <div class="portlet light bordered">
                  <div class="centered">
                    <div class="profile-desc-text">Email: </div>
                    <h3 class="profile-desc-title">{profile.email}</h3>
                    <br />

                    <div class="profile-desc-text">
                      Preferred payment method:{' '}
                    </div>
                    <h3 class="profile-desc-title">
                      {preferredPayment.join(', ')}
                    </h3>
                    <br />

                    {profile.modeOfCommunication === 'Phone' ? (
                      <div>
                        <div class="profile-desc-text">Phone number: </div>
                        <h3 class="profile-desc-title">
                          {profile.phoneNumber}
                        </h3>
                      </div>
                    ) : profile.modeOfCommunication === 'GroupMe' ? (
                      <div>
                        <div class="profile-desc-text">GroupMe: </div>
                        <h3 class="profile-desc-title">{profile.groupMe}</h3>
                      </div>
                    ) : profile.modeOfCommunication === 'Any' ? (
                      <div>
                        <div class="profile-desc-text">Phone number: </div>
                        <h3 class="profile-desc-title">
                          {profile.phoneNumber}
                        </h3>

                        <div class="profile-stat-text">GroupMe: </div>
                        <h3 class="profile-desc-title">{profile.groupMe}</h3>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Grid>
          </form>

          <Grid>
            <div class="profile-content">
              <div>
                <h3 class="profile-desc-title">
                  Reviews for {profile.firstName} {profile.lastName}
                </h3>
                <span class="profile-desc-text">
                  {reviews.map((review) => (
                    <ReviewCards {...review} key={review.id} />
                  ))}
                </span>
              </div>
            </div>
          </Grid>
        </div>
      </ThemeProvider>
    </div>
  );
}

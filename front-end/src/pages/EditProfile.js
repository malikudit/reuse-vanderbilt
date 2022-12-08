import { React, useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  ThemeProvider,
  createTheme,
  Chip,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import DefaultBanner from '../components/DefaultBanner';
import '../css/EditProfile.css';
import { paymentMethods, formsOfContact } from '../content/ProfilePreferences';
import Anonymous from '../assets/Anonymous.png';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import isURL from 'validator/es/lib/isURL';
import swal from 'sweetalert';

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

export default function EditProfile() {
  const [saved, setSaved] = useState(true);
  const [profile, setProfile] = useState([]);
  const [firstName, setFirstName] = useState('');
  var [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState('');
  var [lastNameError, setLastNameError] = useState(false);
  const [email, setEmail] = useState('');
  var [emailError, setEmailError] = useState(false);
  const [preferredPayment, setPreferredPayment] = useState([]);
  const [contact, setContact] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  var [phoneNumberError, setPhoneNumberError] = useState(false);
  const [groupMe, setGroupMe] = useState('');
  var [groupMeError, setGroupMeError] = useState(false);
  var [error, setError] = useState(false);
  let payments = [];
  let contacts = [];
  const [file, setFile] = useState();
  const Send = (event) => {
    const data = new FormData();
    data.append('file', file);
    // data.append('name', name);
  };

  async function getData(url = 'https://api.reusevandy.org/users/me') {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        var d = data;
        setProfile(d);
        setFirstName(d.firstName);
        setLastName(d.lastName);
        setEmail(d.email);

        if (d.modeOfCommunication === 'Phone') {
          contacts.push('Phone');
          setPhoneNumber(d.phoneNumber);
        }
        if (d.modeOfCommunication === 'GroupMe') {
          contacts.push('GroupMe');
          setGroupMe(d.groupMe);
        }
        if (d.modeOfCommunication === 'Any') {
          contacts.push('Phone');
          contacts.push('GroupMe');
          setPhoneNumber(d.phoneNumber);
          setGroupMe(d.groupMe);
        }
        setContact(contacts);
        if (profile.cash) {
          payments.push('Cash');
        }
        if (profile.venmo) {
          payments.push('Venmo');
        }
        if (profile.zelle) {
          payments.push('Zelle');
        }
        setPreferredPayment(payments);
      });
    return response;
  }

  useEffect(() => {
    getData();
  }, []);

  const contactHandler = (event) => {
    setContact(event.target.value);
  };

  const preferredPaymentHandler = (event) => {
    setPreferredPayment(event.target.value);
  };

  const regex = /^[a-zA-Z]+$/;

  const checkNameEmpty = (name) => name.length === 0;

  const checkNameLength = (name) => name.length < 2 || name.length > 32;

  const checkNameAlpha = (name) => !name.match(regex);

  const checkPhoneNumber = (phoneNumber) =>
    !isMobilePhone(phoneNumber, 'en-US');

  const checkGroupMeURL = (groupme) =>
    !isURL(groupme, {
      protocols: ['https'],
      require_protocol: true,
      host_whitelist: ['groupme.com', 'www.groupme.com'],
    });

  const handleEdit = () => {
    setFirstNameError(false);
    setLastNameError(false);
    setPhoneNumberError(false);
    setGroupMeError(false);
    setError(false);
    setSaved(false);
  };
  const handleSave = () => {
    if (checkNameLength(firstName) || checkNameAlpha(firstName)) {
      firstNameError = true;
    }
    if (checkNameLength(lastName) || checkNameAlpha(lastName)) {
      lastNameError = true;
    }
    if (
      (contact === 'Phone' || contact === 'Any') &&
      checkPhoneNumber(phoneNumber)
    ) {
      setPhoneNumberError(true);
      phoneNumberError = true;
    }
    if (
      (contact === 'GroupMe' || contact === 'Any') &&
      checkGroupMeURL(groupMe)
    ) {
      setGroupMeError(true);
      groupMeError = true;
    }
    if (firstNameError || lastNameError || phoneNumberError || groupMeError) {
      setError(true);
      error = true;
    }
    if (!error) {
      var obj = {};
      console.log(firstName);
      obj.firstName = firstName;
      console.log(obj.firstName);
      obj.lastName = lastName;

      if (contact.includes('Phone') && contact.includes('GroupMe')) {
        obj.modeOfCommunication = 'Any';
      } else if (contact.includes('Phone')) {
        obj.modeOfCommunication = 'Phone';
      } else if (contact.includes('GroupMe')) {
        obj.modeOfCommunication = 'GroupMe';
      }

      if (preferredPayment.includes('Cash')) {
        obj.cash = true;
      }
      if (preferredPayment.includes('Venmo')) {
        obj.venmo = true;
      }
      if (preferredPayment.includes('Zelle')) {
        obj.zelle = true;
      }
      if (preferredPayment.includes('Other Payment Method')) {
        obj.otherPaymentMethod = true;
      }

      if (phoneNumber !== '') {
        obj.phoneNumber = phoneNumber;
      }

      if (groupMe !== '') {
        obj.groupMe = groupMe;
      }

      async function patchData(
        url = 'https://api.reusevandy.org/users/me',
        data = obj
      ) {
        const response = await fetch(url, {
          method: 'PATCH',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          body: JSON.stringify({
            firstName: obj.firstName,
            lastName: obj.lastName,
            modeOfCommunication: obj.modeOfCommunication,
            cash: obj.cash,
            venmo: obj.venmo,
            zelle: obj.zelle,
            otherPaymentMethod: obj.otherPaymentMethod,
            phoneNumber: obj.phoneNumber,
            groupMe: obj.groupMe,
          }),
        });
        console.log(data);

        return response;
      }

      patchData('https://api.reusevandy.org/users/me').then((data) => {
        if (data.error) {
          swal('Oops!', data.error, 'error');
          window.location.href = '#/edit_profile';
        } else {
          setSaved(true);
          swal('Success', 'Profile updated', 'success').then(function () {
            window.location.href = '#/profile';
          });
          console.log(data);
        }
      });
    }
  };
  return (
    <div class="container-edit-profile">
      <ThemeProvider theme={theme}>
        <DefaultBanner banner={'Edit Profile'} />
        <form autoComplete="off" onSubmit={handleSave}>
          <div class="row edit-profile">
            <Grid xs={3}>
              <div class="edit-profile-sidebar">
                <div class="edit-profile-userpic">
                  <img src={Anonymous} alt="" />
                </div>

                <div class="edit-profile-usertitle">
                  <div class="edit-profile-usertitle-name">
                    <TextField
                      label="First Name"
                      width="auto"
                      variant={saved ? 'standard' : 'standard'}
                      disabled={saved}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                      value={firstName}
                      error={
                        (checkNameEmpty(firstName) ||
                          checkNameLength(firstName) ||
                          checkNameAlpha(firstName)) &&
                        saved === false
                      }
                      helperText={
                        saved === true
                          ? ''
                          : checkNameLength(firstName)
                          ? 'First name must be between 2-32 characters'
                          : checkNameAlpha(firstName)
                          ? 'First name must be alphabetical'
                          : ''
                      }
                    />
                  </div>

                  <div class="edit-profile-usertitle-name">
                    <TextField
                      label="Last Name"
                      width="auto"
                      variant={saved ? 'standard' : 'standard'}
                      disabled={saved}
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                      value={lastName}
                      error={
                        (checkNameEmpty(lastName) ||
                          checkNameLength(lastName) ||
                          checkNameAlpha(lastName)) &&
                        saved === false
                      }
                      helperText={
                        saved === true
                          ? ''
                          : checkNameLength(lastName)
                          ? 'Last name must be between 2-32 characters'
                          : checkNameAlpha(lastName)
                          ? 'Last name must be alphabetical'
                          : ''
                      }
                    />
                  </div>
                </div>
                <div class="edit-profile-userbuttons">
                  {saved ? (
                    <Button
                      component="label"
                      onClick={() => {
                        handleEdit();
                      }}
                      sx={{
                        marginTop: '1vh',
                        marginBottom: '3vh',
                      }}
                    >
                      Edit Profile Details
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      component="label"
                      onClick={() => {
                        handleSave();
                      }}
                    >
                      Save Changes
                    </Button>
                  )}
                </div>
              </div>
            </Grid>

            <Grid>
              <div class="edit-profile-content">
                <div>
                  <h2 class="edit-profile-desc-title">Profile Details</h2>
                  <div class="portlet light bordered">
                    <div class="row list-separated edit-profile-stat">
                      <div class="col-md-4 col-sm-4 col-xs-6">
                        <div class="profile-stat-title">
                          <TextField
                            fullWidth
                            label="Email"
                            variant="standard"
                            disabled
                            value={email}
                            sx={{
                              marginTop: '1vh',
                            }}
                          />
                        </div>
                      </div>

                      <div class="col-md-4 col-sm-4 col-xs-6">
                        <div class="edit-profile-stat-title">
                          <FormControl
                            fullWidth
                            sx={{
                              marginTop: '1vh',
                            }}
                          >
                            <InputLabel
                              id="demo-simple-select-label"
                              sx={{
                                marginLeft: '-1vw',
                                marginTop: '1vh',
                              }}
                            >
                              Preferred form of contact
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              multiple
                              label="Preferred form of contact"
                              variant="standard"
                              disabled={saved}
                              onChange={contactHandler}
                              value={contact}
                              sx={{
                                marginTop: '1vh',
                              }}
                            >
                              {formsOfContact.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {contact.includes('Phone') &&
                          contact.includes('GroupMe') ? (
                            <Grid>
                              <TextField
                                fullWidth
                                label="Phone Number"
                                variant={saved ? 'standard' : 'standard'}
                                disabled={saved}
                                onChange={(event) => {
                                  setPhoneNumber(event.target.value);
                                }}
                                error={
                                  checkPhoneNumber(phoneNumber) &&
                                  saved === false
                                }
                                helperText={
                                  saved === true
                                    ? ''
                                    : checkPhoneNumber(phoneNumber)
                                    ? 'Enter a valid US phone number'
                                    : ''
                                }
                                sx={{
                                  marginTop: '1vh',
                                }}
                                value={phoneNumber}
                              />
                              <TextField
                                fullWidth
                                label="GroupMe URL"
                                variant={saved ? 'standard' : 'standard'}
                                disabled={saved}
                                onChange={(event) => {
                                  setGroupMe(event.target.value);
                                }}
                                error={
                                  checkGroupMeURL(groupMe) && saved === false
                                }
                                helperText={
                                  saved === true
                                    ? ''
                                    : checkGroupMeURL(groupMe)
                                    ? 'The provided URL must be from groupme.com and use https'
                                    : ''
                                }
                                value={groupMe}
                                sx={{
                                  marginTop: '1vh',
                                }}
                              />
                            </Grid>
                          ) : contact.includes('Phone') ? (
                            <TextField
                              fullWidth
                              label="Phone Number"
                              variant={saved ? 'standard' : 'standard'}
                              disabled={saved}
                              onChange={(event) => {
                                setPhoneNumber(event.target.value);
                              }}
                              error={
                                checkPhoneNumber(phoneNumber) && saved === false
                              }
                              helperText={
                                saved === true
                                  ? ''
                                  : checkPhoneNumber(phoneNumber)
                                  ? 'Enter a valid US phone number'
                                  : ''
                              }
                              sx={{
                                marginTop: '1vh',
                              }}
                              value={phoneNumber}
                            />
                          ) : contact.includes('GroupMe') ? (
                            <TextField
                              fullWidth
                              label="GroupMe URL"
                              variant={saved ? 'standard' : 'standard'}
                              disabled={saved}
                              onChange={(event) => {
                                setGroupMe(event.target.value);
                              }}
                              error={
                                checkGroupMeURL(groupMe) && saved === false
                              }
                              helperText={
                                saved === true
                                  ? ''
                                  : checkGroupMeURL(groupMe)
                                  ? 'The provided URL must be from groupme.com and use https'
                                  : ''
                              }
                              sx={{
                                marginTop: '1vh',
                              }}
                              value={groupMe}
                            />
                          ) : null}
                        </div>
                      </div>

                      <div class="col-md-4 col-sm-4 col-xs-6">
                        <div class="edit-profile-stat-title">
                          <FormControl
                            fullWidth
                            sx={{
                              marginTop: '1vh',
                            }}
                          >
                            <InputLabel
                              id="demo-simple-select-label"
                              sx={{
                                marginLeft: '-1vw',
                                marginTop: '1vh',
                              }}
                            >
                              Preferred form(s) of payment
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              multiple
                              label="Preferred form(s) of payment"
                              variant="standard"
                              disabled={saved}
                              onChange={preferredPaymentHandler}
                              value={preferredPayment}
                              sx={{
                                marginTop: '1vh',
                              }}
                            >
                              {paymentMethods.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </div>
        </form>
      </ThemeProvider>
    </div>
  );
}

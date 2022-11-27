import { React, useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  Chip,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DefaultBanner from "../components/DefaultBanner";
import ReviewCards from "../components/ReviewCards";
import { SampleReviews } from "../content/SampleReviews";
import "./Profile.css";
import {
  paymentMethods,
  formsOfContact,
} from "../content/ProfilePreferences";
import Parwaz from "../assets/Parwaz.png";
import Bike from "../assets/Bike.jpg";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isURL from "validator/es/lib/isURL";
import swal from "sweetalert";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DAA520",
    },
    secondary: {
      main: "#212121",
    },
    neutral: {
      main: "#ffffff",
    },
    info: {
      main: "#4169E1",
    },
    success: {
      main: "#228B22",
    },
    background: {
      default: "#696969",
    },
  },
});

export default function Profile() {
  const [saved, setSaved] = useState(true);
  const [firstName, setFirstName] = useState("Parwaz");
  var [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("Gill");
  var [lastNameError, setLastNameError] = useState(false);
  const [preferredPayment, setPreferredPayment] = useState(["Venmo"]);
  const [contact, setContact] = useState("Phone");
  const [phoneNumber, setPhoneNumber] = useState("2022022020");
  var [phoneNumberError, setPhoneNumberError] = useState(false);
  const [groupMe, setGroupMe] = useState("");
  var [groupMeError, setGroupMeError] = useState(false);
  var [error, setError] = useState(false);

  const preferredPaymentHandler = (event) => {
    setPreferredPayment(event.target.value);
  };

  const regex = /^[a-zA-Z]+$/;

  const checkNameEmpty = (name) => name.length === 0;

  const checkNameLength = (name) => name.length < 2 || name.length > 32;

  const checkNameAlpha = (name) => !name.match(regex);

  const checkPhoneNumber = (phoneNumber) =>
    !isMobilePhone(phoneNumber, "en-US");

  const checkGroupMeURL = (groupme) =>
    !isURL(groupme, {
      protocols: ["https"],
      require_protocol: true,
      host_whitelist: ["groupme.com", "www.groupme.com"],
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

    if (
      checkNameLength(firstName) ||
      checkNameAlpha(firstName)
    ) {
      firstNameError = true;
    }
    if (
      checkNameLength(lastName) ||
      checkNameAlpha(lastName)
    ) {
      lastNameError = true;
    }
    if ((contact === "Phone" || contact === "Any") && checkPhoneNumber(phoneNumber)) {
      phoneNumberError = true;
    }
    if ((contact === "GroupMe" || contact === "Any") && checkGroupMeURL(groupMe)) {
      groupMeError = true;
    }
    if (firstNameError || lastNameError || phoneNumberError || groupMeError) {
      error = true;
    }
    if (!error) {
      setSaved(true);
      swal("Success", "Profile saved!", "success");
    }
  };

  return (
    <div class="container-profile">
      <ThemeProvider theme={theme}>
        <DefaultBanner banner={"User Profile"} />

        <div class="row profile">
          <form autoComplete="off" onSubmit={handleSave}>
            <Grid xs={3}>
              <div class="profile-sidebar">
                <div class="profile-userpic">
                  <img src={Bike} alt="" />
                </div>
                <div class="profile-userbuttons">
                  <Button>Change Profile Picture</Button>
                </div>
                <div class="profile-usertitle">
                  <div class="profile-usertitle-name">
                    <TextField
                      width="auto" label="First Name"
                      variant={saved ? "standard" : "standard"}
                      disabled={saved}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                      value={firstName}
                      error={
                        (checkNameEmpty(firstName) ||
                          checkNameLength(firstName) ||
                          checkNameAlpha(firstName)) && saved === false
                      }
                      helperText={
                        saved === true ? ""
                          : checkNameLength(firstName)
                            ? "First name must be between 2-32 characters"
                            : checkNameAlpha(firstName)
                              ? "First name must be alphabetical"
                              : ""
                      } />
                  </div>

                  <div class="profile-usertitle-name">
                    <TextField
                      width="auto" label="Last Name"
                      variant={saved ? "standard" : "standard"}
                      disabled={saved}
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                      value={lastName}
                      error={
                        (checkNameEmpty(lastName) ||
                          checkNameLength(lastName) ||
                          checkNameAlpha(lastName)) && saved === false
                      }
                      helperText={
                        saved === true ? ""
                          : checkNameLength(lastName)
                            ? "Last name must be between 2-32 characters"
                            : checkNameAlpha(lastName)
                              ? "Last name must be alphabetical"
                              : ""
                      } />
                  </div>
                </div>
                <div class="profile-userbuttons">
                  {saved ? (
                    <Button
                      variant="contained"
                      component="label"
                      onClick={() => { handleEdit(); }}
                      sx={{
                        marginTop: "1vh",
                        marginBottom: "3vh"
                      }}>
                      Edit Profile Details
                    </Button>
                  ) : (
                    <Button variant="contained" color="success" component="label" onClick={() => { handleSave(); }}>
                      Save Changes
                    </Button>
                  )}
                </div>
                <div class="portlet light bordered">
                  <div class="centered">
                    <h4 class="profile-desc-title">Profile Details</h4>

                    <TextField
                      fullWidth
                      label="Email"
                      variant="standard"
                      disabled
                      value="udit.malik@vanderbilt.edu"
                      sx={{
                        marginTop: "1vh"
                      }}
                    />

                    <FormControl fullWidth
                      sx={{
                        marginTop: "1vh"
                      }}>
                      <InputLabel id="demo-simple-select-label"
                        sx={{
                          marginLeft: "-1vw",
                          marginTop: "1vh"
                        }}>
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
                          marginTop: "1vh"
                        }}
                        renderValue={(preferredPayment) => (
                          <div>
                            {preferredPayment.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </div>
                        )}>
                        {paymentMethods.map((option) => (
                          <MenuItem key={option.value}
                            value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      select
                      label="Preferred form of contact"
                      variant="standard"
                      disabled={saved}
                      onChange={(event) => {
                        setContact(event.target.value);
                      }}
                      value={contact}
                      sx={{
                        marginTop: "1vh"
                      }}
                    >
                      {formsOfContact.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    {contact === "Any" ? (
                      <Grid>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          variant={saved ? "standard" : "standard"}
                          disabled={saved}
                          onChange={(event) => {
                            setPhoneNumber(event.target.value);
                          }}
                          error={
                            checkPhoneNumber(phoneNumber) && saved === false
                          }
                          helperText={
                            saved === true
                              ? ""
                              : checkPhoneNumber(phoneNumber)
                                ? "Enter a valid US phone number"
                                : ""
                          }
                          sx={{
                            marginTop: "1vh"
                          }}
                          value={phoneNumber}
                        />
                        <TextField
                          fullWidth
                          label="GroupMe URL"
                          variant={saved ? "standard" : "standard"}
                          disabled={saved}
                          onChange={(event) => {
                            setGroupMe(event.target.value);
                          }}
                          error={
                            checkGroupMeURL(groupMe) && saved === false
                          }
                          helperText={
                            saved === true
                              ? ""
                              : checkGroupMeURL(groupMe)
                                ? "The provided URL must be from groupme.com and use https"
                                : ""
                          }
                          value={groupMe}
                          sx={{
                            marginTop: "1vh"
                          }} />
                      </Grid>

                    ) :

                      contact === "Phone" ? (
                        <TextField
                          fullWidth
                          label="Phone Number"
                          variant={saved ? "standard" : "standard"}
                          disabled={saved}
                          onChange={(event) => {
                            setPhoneNumber(event.target.value);
                          }}
                          error={
                            checkPhoneNumber(phoneNumber) && saved === false
                          }
                          helperText={
                            saved === true
                              ? ""
                              : checkPhoneNumber(phoneNumber)
                                ? "Enter a valid US phone number"
                                : ""
                          }
                          sx={{
                            marginTop: "1vh"
                          }}
                          value={phoneNumber}
                        />

                      ) : contact === "GroupMe" ? (

                        <TextField
                          fullWidth
                          label="GroupMe URL"
                          variant={saved ? "standard" : "standard"}
                          disabled={saved}
                          onChange={(event) => {
                            setGroupMe(event.target.value);
                          }}
                          error={
                            checkGroupMeURL(groupMe) && saved === false
                          }
                          helperText={
                            saved === true
                              ? ""
                              : checkGroupMeURL(groupMe)
                                ? "The provided URL must be from groupme.com and use https"
                                : ""
                          }
                          sx={{
                            marginTop: "1vh"
                          }}
                          value={groupMe} />
                      ) : null}
                  </div>
                </div>
              </div>
            </Grid>
          </form>

          <Grid>
            <div class="profile-content">
            </div>
          </Grid>

          <Grid>
            <div class="profile-content">
              <div>
                <h3 class="profile-desc-title">Review by Udit Malik</h3>
                <span class="profile-desc-text"> Lorem ipsum dolor sit amet diam nonummy nibh dolore. </span>
              </div>
            </div>
          </Grid>

          <Grid>
            <div class="profile-content">
              <div>
                <h2 class="profile-desc-title">Usage History</h2>
                <div class="portlet light bordered">
                  <div class="row list-separated profile-stat">
                    <div class="col-md-4 col-sm-4 col-xs-6">
                      <div class="uppercase profile-stat-title"> 37 </div>
                      <div class="uppercase profile-stat-text"> Listings </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6">
                      <div class="uppercase profile-stat-title"> 51 </div>
                      <div class="uppercase profile-stat-text"> Products Sold </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6">
                      <div class="uppercase profile-stat-title"> 61 </div>
                      <div class="uppercase profile-stat-text"> Products Bought </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6">
                      <div class="uppercase profile-stat-title"> 3.77 </div>
                      <div class="uppercase profile-stat-text"> Average Rating </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6">
                      <div class="uppercase profile-stat-title">
                        <Button>
                          View All Reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>




        </div>


      </ThemeProvider>
    </div >

    //               <Grid xs={12} marginTop={4}>
    //                 <Box sx={{ boxShadow: "0 0 5px #ccc", }}>
    //                   <Grid
    //                     sx={{ boxShadow: "0 0 5px #ccc", }}
    //                   >
    //                     <Typography variant="h4" align="center">
    //                       Reviews of this User
    //                     </Typography>
    //                   </Grid>
    //                   <Grid container>
    //                     {SampleReviews.map((review) => (
    //                       <ReviewCards {...review} key={review.itemName} />
    //                     ))}
    //                   </Grid>
    //                 </Box>
    //               </Grid>
    //             </Grid>
    //           </Grid>
    //         </form>
    //       </Box> */}
    //     // </ThemeProvider>
  );
}

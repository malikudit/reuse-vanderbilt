import { React, useState } from "react";
import {
  Grid,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import DefaultBanner from "../components/DefaultBanner";
import ReviewCards from "../components/ReviewCards";
import { SampleReviews } from "../content/SampleReviews";
import "./Profile.css";
import { paymentMethods, formsOfContact } from "../content/ProfilePreferences";
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
    if (checkNameLength(firstName) || checkNameAlpha(firstName)) {
      firstNameError = true;
    }
    if (checkNameLength(lastName) || checkNameAlpha(lastName)) {
      lastNameError = true;
    }
    if (
      (contact === "Phone" || contact === "Any") &&
      checkPhoneNumber(phoneNumber)
    ) {
      phoneNumberError = true;
    }
    if (
      (contact === "GroupMe" || contact === "Any") &&
      checkGroupMeURL(groupMe)
    ) {
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
                <div class="profile-usertitle">
                  <div class="profile-usertitle-name">
                    <h2 class="profile-desc-title">Parwaz Gill</h2>
                  </div>
                </div>

                <div class="portlet light bordered">
                  <div class="centered">
                    <div class="profile-desc-text">Email: </div>
                    <h3 class="profile-desc-title">parwazgill3@gmail.com</h3>
                    <br />

                    <div class="profile-desc-text">
                      Preferred payment method:{" "}
                    </div>
                    <h3 class="profile-desc-title">Venmo</h3>
                    <br />

                    {contact === "Phone" ? (
                      <div>
                        <div class="profile-desc-text">Phone number: </div>
                        <h3 class="profile-desc-title">615-602-9500</h3>
                      </div>
                    ) : contact === "GroupMe" ? (
                      <div>
                        <div class="profile-desc-text">GroupMe: </div>
                        <h3 class="profile-desc-title">
                          https://groupme.com/udit-malik
                        </h3>
                      </div>
                    ) : contact === "Any" ? (
                      <div>
                        <div class="profile-desc-text">Phone number: </div>
                        <h3 class="profile-desc-title">615-602-9500</h3>

                        <div class="profile-stat-text">GroupMe: </div>
                        <h3 class="profile-desc-title">
                          https://groupme.com/udit-malik
                        </h3>
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
                <h3 class="profile-desc-title">Reviews for Parwaz Gill</h3>
                <span class="profile-desc-text">
                  {SampleReviews.map((review) => (
                    <ReviewCards {...review} key={review.itemName} />
                  ))}
                </span>
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
                      <div class="uppercase profile-stat-text">
                        {" "}
                        Products Sold{" "}
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6">
                      <div class="uppercase profile-stat-title"> 61 </div>
                      <div class="uppercase profile-stat-text">
                        {" "}
                        Products Bought{" "}
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6">
                      <div class="uppercase profile-stat-title"> 3.77 </div>
                      <div class="uppercase profile-stat-text">
                        {" "}
                        Average Rating{" "}
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6">
                      <div class="uppercase profile-stat-title">
                        <Button
                          sx={{
                            marginTop: "5vh",
                          }}
                        >
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
    </div>
  );
}

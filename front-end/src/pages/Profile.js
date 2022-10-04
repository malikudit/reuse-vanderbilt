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
} from "@mui/material";
import DefaultBanner from "../components/DefaultBanner";
import ReviewCards from "../components/ReviewCards";
import Parwaz from "../assets/Parwaz.png";
import Couch from "../assets/Couch.jpg";
import Bike from "../assets/Bike.jpg";
import iPad from "../assets/iPad.jpg";
import "./Profile.css";

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
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [meetingLocation, setMeetingLocation] = useState();
  const [preferredPayment, setPreferredPayment] = useState();
  const [contact, setContact] = useState();

  const paymentMethods = [
    {
      value: "Credit Card",
      label: "Credit Card",
    },
    {
      value: "Debit Card",
      label: "Debit Card",
    },
    {
      value: "Venmo",
      label: "Venmo",
    },
    {
      value: "Cash",
      label: "Cash",
    },
    {
      value: "Zelle",
      label: "Zelle",
    },
    {
      value: "Any",
      label: "Any",
    },
  ];

  const meetingLocations = [
    {
      value: "On-Campus",
      label: "On-Campus",
    },
    {
      value: "Off-Campus",
      label: "Off-Campus",
    },
    {
      value: "Any",
      label: "Any",
    },
  ];

  const formsOfContact = [
    {
      value: "Phone",
      label: "Phone",
    },
    {
      value: "GroupMe",
      label: "GroupMe",
    },
    {
      value: "Any",
      label: "Any",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <DefaultBanner banner={"User Profile"} />
        <Grid container paddingRight={4} justifyContent="flex-end">
          {saved ? (
            <Grid padding={2}>
              <Button
                variant="contained"
                color="info"
                component="label"
                onClick={() => {
                  setSaved(false);
                }}
              >
                Edit Profile
              </Button>
            </Grid>
          ) : (
            <Grid padding={2}>
              <Button
                variant="contained"
                component="label"
                color="success"
                onClick={() => {
                  setSaved(true);
                }}
              >
                Save Changes
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid container margin={"auto"}>
          <Grid xs={3} padding={1}>
            <Grid
              sx={{ border: "2px solid black", borderRadius: "16px" }}
              alignItems="center"
              justifyContent="center"
            >
              <Grid align="center">
                <img
                  src={Parwaz}
                  alt="Parwaz"
                  height={300}
                  className="img-wrapper"
                />
              </Grid>
              <Grid container alignItems="center" align="center">
                <Grid xs={6}>
                  <Typography variant="h6">Profile Picture</Typography>
                </Grid>
                <Grid xs={6} padding={2}>
                  <Button variant="contained" color="info" component="label">
                    Upload File
                    <input type="file" hidden />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={9} padding={1} sx={{ color: "secondary.main" }}>
            <Grid
              container
              sx={{ border: "2px solid black", borderRadius: "16px" }}
            >
              <Grid xs={6} padding={2}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant={saved ? "outlined" : "filled"}
                  disabled={saved}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                  value={firstName}
                  required
                />
              </Grid>
              <Grid xs={6} padding={2}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant={saved ? "outlined" : "filled"}
                  disabled={saved}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                  value={lastName}
                />
              </Grid>
              <Grid xs={6} padding={2}>
                <TextField
                  fullWidth
                  label="Username"
                  variant={saved ? "outlined" : "filled"}
                  disabled={saved}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                  value={userName}
                  required
                />
              </Grid>
              <Grid xs={6} padding={2}>
                <TextField
                  fullWidth
                  select
                  label="Preferred Meeting Location"
                  variant={saved ? "outlined" : "filled"}
                  disabled={saved}
                  onChange={(event) => {
                    setMeetingLocation(event.target.value);
                  }}
                  value={meetingLocation}
                >
                  {meetingLocations.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={6} padding={2}>
                <TextField
                  fullWidth
                  select
                  label="Preferred Form of Payment"
                  variant={saved ? "outlined" : "filled"}
                  disabled={saved}
                  onChange={(event) => {
                    setPreferredPayment(event.target.value);
                  }}
                  value={preferredPayment}
                >
                  {paymentMethods.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={6} padding={2}>
                <TextField
                  fullWidth
                  select
                  label="Preferred Form of Contact"
                  variant={saved ? "outlined" : "filled"}
                  disabled={saved}
                  onChange={(event) => {
                    setContact(event.target.value);
                  }}
                  value={contact}
                >
                  {formsOfContact.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid xs={12} marginTop={4}>
              <Box sx={{ border: "1px solid black", borderRadius: "16px" }}>
                <Grid sx={{ border: "1px solid black", borderRadius: "16px" }}>
                  <Typography variant="h4" align="center">
                    Reviews of this User
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid xs={4}>
                    <ReviewCards
                      image={Couch}
                      alt="Couch"
                      reviewTitle="Great Couch!"
                      reviewBody="Couch was in great quality. Seller was very cooperative in terms
                of timing and price."
                      rating={4.5}
                    />
                  </Grid>
                  <Grid xs={4}>
                    <ReviewCards
                      image={Bike}
                      alt="Bike"
                      reviewTitle="Mid bike!"
                      reviewBody="Bike was super mid honestly."
                      rating={2.5}
                    />
                  </Grid>
                  <Grid xs={4}>
                    <ReviewCards
                      image={iPad}
                      alt="iPad"
                      reviewTitle="Thanks Parwaz!"
                      reviewBody="Parwaz gave me a fire iPad!"
                      rating={5}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

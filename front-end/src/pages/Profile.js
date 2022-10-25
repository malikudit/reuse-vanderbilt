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
import { SampleReviews } from "../content/SampleReviews";
import "./Profile.css";
import {
  paymentMethods,
  meetingLocations,
  formsOfContact,
} from "../content/ProfilePreferences";
import Parwaz from "../assets/Parwaz.png";

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "#FFFFFF" }}>
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
                  <Button
                    variant="contained"
                    color="info"
                    component="label"
                    disabled={saved}
                  >
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
                  required
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
                  {SampleReviews.map((review) => (
                    <ReviewCards {...review} key={review.itemName} />
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

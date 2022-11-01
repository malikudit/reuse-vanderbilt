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
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isURL from "validator/es/lib/isURL";

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
      alert("Profile saved!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "#FFFFFF" }}>
        <DefaultBanner banner={"User Profile"} />
        <form autoComplete="off" onSubmit={handleSave}>
          <Grid container paddingRight={4} justifyContent="flex-end">
            {saved ? (
              <Grid padding={2}>
                <Button
                  variant="contained"
                  color="info"
                  component="label"
                  onClick={() => {
                    handleEdit();
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
                    handleSave();
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
                    error={
                      (checkNameEmpty(firstName) ||
                        checkNameLength(firstName) ||
                        checkNameAlpha(firstName)) &&
                      saved === false
                    }
                    helperText={
                      saved === true
                        ? ""
                        : checkNameLength(firstName)
                        ? "First name must be between 2 to 32 characters long"
                        : checkNameAlpha(firstName)
                        ? "First name must be alphabetical"
                        : ""
                    }
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
                    error={
                      (checkNameEmpty(lastName) ||
                        checkNameLength(lastName) ||
                        checkNameAlpha(lastName)) &&
                      saved === false
                    }
                    helperText={
                      saved === true
                        ? ""
                        : checkNameLength(lastName)
                        ? "Last name must be between 2 to 32 characters long"
                        : checkNameAlpha(lastName)
                        ? "Last name must be alphabetical"
                        : ""
                    }
                    value={lastName}
                  />
                </Grid>
                <Grid xs={6} padding={2}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant={saved ? "outlined" : "filled"}
                    disabled
                    value="parwaz.s.gill@vanderbilt.edu"
                  />
                </Grid>
                <Grid xs={6} padding={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Preferred Form(s) of Payment
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      multiple
                      label="Preferred Form of Payment"
                      variant={saved ? "outlined" : "filled"}
                      disabled={saved}
                      onChange={preferredPaymentHandler}
                      value={preferredPayment}
                      renderValue={(preferredPayment) => (
                        <div>
                          {preferredPayment.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </div>
                      )}
                    >
                      {paymentMethods.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                {contact === "Phone" ? (
                    <Grid xs={6} padding={2}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant={saved ? "outlined" : "filled"}
                        disabled={saved}
                        onChange={(event) => {
                          setPhoneNumber(event.target.value);
                        }}
                        error={checkPhoneNumber(phoneNumber) && saved === false}
                        helperText={
                          saved === true
                            ? ""
                            : checkPhoneNumber(phoneNumber)
                            ? "Enter a valid US phone number"
                            : ""
                        }
                        value={phoneNumber}
                      />
                    </Grid>
                ) : contact === "GroupMe" ? (
                    <Grid xs={6} padding={2}>
                      <TextField
                        fullWidth
                        label="GroupMe URL"
                        variant={saved ? "outlined" : "filled"}
                        disabled={saved}
                        onChange={(event) => {
                          setGroupMe(event.target.value);
                        }}
                        error={checkGroupMeURL(groupMe) && saved === false}
                        helperText={
                          saved === true
                            ? ""
                            : checkGroupMeURL(groupMe)
                            ? "The provided URL must be from groupme.com and use https"
                            : ""
                        }
                        value={groupMe}
                      />
                    </Grid>
                ) : contact === "Any" ? (
                  <Grid container>
                    <Grid xs={6} padding={2}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant={saved ? "outlined" : "filled"}
                        disabled={saved}
                        onChange={(event) => {
                          setPhoneNumber(event.target.value);
                        }}
                        error={checkPhoneNumber(phoneNumber) && saved === false}
                        helperText={
                          saved === true
                            ? ""
                            : checkPhoneNumber(phoneNumber)
                            ? "Enter a valid US phone number"
                            : ""
                        }
                        value={phoneNumber}
                      />
                    </Grid>

                    <Grid xs={6} padding={2}>
                      <TextField
                        fullWidth
                        label="GroupMe URL"
                        variant={saved ? "outlined" : "filled"}
                        disabled={saved}
                        onChange={(event) => {
                          setGroupMe(event.target.value);
                        }}
                        error={checkGroupMeURL(groupMe) && saved === false}
                        helperText={
                          saved === true
                            ? ""
                            : checkGroupMeURL(groupMe)
                            ? "The provided URL must be from groupme.com and use https"
                            : ""
                        }
                        value={groupMe}
                      />
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
              <Grid xs={12} marginTop={4}>
                <Box sx={{ border: "1px solid black", borderRadius: "16px" }}>
                  <Grid
                    sx={{ border: "1px solid black", borderRadius: "16px" }}
                  >
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
        </form>
      </Box>
    </ThemeProvider>
  );
}

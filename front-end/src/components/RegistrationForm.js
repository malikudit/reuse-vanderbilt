import React from "react";
import Logo from "../assets/VanderbiltLogo.jpg";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "./Form.css";
import swal from "sweetalert";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isURL from "validator/es/lib/isURL";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { paymentMethods, formsOfContact } from "../content/ProfilePreferences";
import { Container } from "@mui/system";

export default function Form(props) {
  const {
    register,
    formState: {},
  } = useForm();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [preferredPayment, setPreferredPayment] = useState([]);
  const [preferredPaymentError, setPreferredPaymentError] = useState(false);
  const [preferredCommunication, setPreferredCommunication] = useState("");
  const [preferredCommunicationError, setPreferredCommunicationError] =
    useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [groupMe, setGroupMe] = useState("");
  const [groupMeError, setGroupMeError] = useState(false);
  const [error, setError] = useState(false);

  const checkFirstName = (name) => !name.match("^[A-Za-z]{2,32}$");

  const checkLastName = (name) => !name.match("^[A-Za-z]{2,32}$");

  const checkEmail = (name) =>
    !name.match("^[A-Za-z0-9._%+-]+@vanderbilt.edu$");

  const checkPassword = (name) =>
    !name.match(
      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$"
    );

  const checkConfirmPassword = (name) => name !== password;

  const checkPreferredPayment = (name) => name.length === 0;

  const checkPreferredContact = (name) => name === "";

  const checkPhoneNumber = (phoneNumber) =>
    (preferredCommunication === "Phone" || preferredCommunication === "Any") &&
    !isMobilePhone(phoneNumber, "en-US");

  const checkGroupMeURL = (groupme) =>
    (preferredCommunication === "GroupMe" ||
      preferredCommunication === "Any") &&
    !isURL(groupme, {
      protocols: ["https"],
      require_protocol: true,
      host_whitelist: ["groupme.com", "www.groupme.com"],
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkFirstName(firstName)) {
      setFirstNameError(true);
      return;
    }
    if (checkLastName(lastName)) {
      setLastNameError(true);
      return;
    }
    if (checkEmail(email)) {
      setEmailError(true);
      return;
    }
    if (checkPassword(password)) {
      setPasswordError(true);
      return;
    }
    if (checkConfirmPassword(confirmPassword)) {
      setConfirmPasswordError(true);
      return;
    }
    if (checkPreferredPayment(preferredPayment)) {
      setPreferredPaymentError(true);
      return;
    }
    if (checkPreferredContact(preferredCommunication)) {
      setPreferredCommunicationError(true);
      return;
    }
    if (
      (preferredCommunication === "Phone" ||
        preferredCommunication === "Any") &&
      checkPhoneNumber(phoneNumber)
    ) {
      setPhoneNumberError(true);
      return;
    }
    if (
      (preferredCommunication === "GroupMe" ||
        preferredCommunication === "Any") &&
      checkGroupMeURL(groupMe)
    ) {
      setGroupMeError(true);
      return;
    }
    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      preferredPaymentError ||
      preferredCommunicationError ||
      phoneNumberError ||
      groupMeError
    ) {
      setError(true);
      return;
    }
    if (!error) {
      var obj = {};
      obj.firstName = firstName;
      obj.lastName = lastName;
      obj.email = email;
      obj.password = password;
      if (preferredPayment.includes("Cash")) {
        obj.cash = true;
      }
      if (preferredPayment.includes("Venmo")) {
        obj.venmo = true;
      }
      if (preferredPayment.includes("Zelle")) {
        obj.zelle = true;
      }
      if (preferredPayment.includes("Other Payment Method")) {
        obj.otherPaymentMethod = true;
      }

      obj.preferredCommunication = preferredCommunication;

      if (phoneNumber !== "") {
        obj.phoneNumber = phoneNumber;
      }

      if (groupMe !== "") {
        obj.groupMe = groupMe;
      }

      async function postData(url = "", data = obj) {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          body: JSON.stringify({
            user: data,
          }),
        });

        return response.json(); // parses JSON response into native JavaScript objects
      }

      postData("http://3.230.48.124:8080/users", obj).then((data) => {
        if (data.error) {
          swal("Oops!", data.error, "error");
        } else {
          swal("Success", "Account created", "success").then(function () {
            window.location.href = "/login";
          });
        }
      });
    }
  };

  return (
    <Container className="App">
      <Grid container className="form-design">
        <Grid item xs={6} className="col-1">
          <h2>Welcome to Reuse Vandy!</h2>
          <small>Get started with an account now.</small>
          <form onSubmit={handleSubmit}>
            <div>
              <Grid container>
                <Grid item xs={2.75} />
                <Grid item xs={6} margin={1.25}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    size="small"
                    onChange={(event) => {
                      setFirstName(event.target.value);
                      checkFirstName(event.target.value)
                        ? setFirstNameError(true)
                        : setFirstNameError(false);
                    }}
                    value={firstName}
                    error={firstNameError}
                    helperText={
                      firstNameError
                        ? "First Name should be 2-32 characters and should be alphabetical"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={3.25} />
              </Grid>
              <Grid container>
                <Grid item xs={2.75} />
                <Grid item xs={6} margin={1.25}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    size="small"
                    onChange={(event) => {
                      setLastName(event.target.value);
                      checkLastName(event.target.value)
                        ? setLastNameError(true)
                        : setLastNameError(false);
                    }}
                    value={lastName}
                    error={lastNameError}
                    helperText={
                      lastNameError
                        ? "Last Name should be 2-32 characters and should be alphabetical"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={3.25} />
              </Grid>
              <Grid container>
                <Grid item xs={2.75} />
                <Grid item xs={6} margin={1.25}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    size="small"
                    onChange={(event) => {
                      setEmail(event.target.value);
                      checkEmail(event.target.value)
                        ? setEmailError(true)
                        : setEmailError(false);
                    }}
                    value={email}
                    error={emailError}
                    helperText={
                      emailError
                        ? "Please use a vanderbilt.edu email address to sign up"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={3.25} />
              </Grid>
              <Grid container>
                <Grid item xs={2.75} />
                <Grid item xs={6} margin={1.25}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    size="small"
                    type="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                      checkPassword(event.target.value)
                        ? setPasswordError(true)
                        : setPasswordError(false);
                    }}
                    value={password}
                    error={passwordError}
                    helperText={
                      passwordError
                        ? "Password must must be between 8 to 32 characters long and include at least one uppercase, one lowercase, one number and a special character"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={3.25} />
              </Grid>
              <Grid container>
                <Grid item xs={2.75} />
                <Grid item xs={6} margin={1.25}>
                  <TextField
                    required
                    fullWidth
                    label="Confirm Password"
                    size="small"
                    type="password"
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      checkConfirmPassword(event.target.value)
                        ? setConfirmPasswordError(true)
                        : setConfirmPasswordError(false);
                    }}
                    value={confirmPassword}
                    error={confirmPasswordError}
                    helperText={
                      confirmPasswordError ? "Password must match" : ""
                    }
                  />
                </Grid>
                <Grid item xs={3.25} />
              </Grid>
              <Grid container>
                <Grid item xs={2.75} />
                <Grid item xs={6} margin={1.25}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="demo-simple-select-label"
                      required
                      size="small"
                    >
                      Preferred Payment Method(s)
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      multiple
                      size="small"
                      label="Preferred Payment Method"
                      onChange={(event) => {
                        setPreferredPayment(event.target.value);
                        checkPreferredPayment(event.target.value)
                          ? setPreferredPaymentError(true)
                          : setPreferredPaymentError(false);
                      }}
                      value={preferredPayment}
                      error={preferredPaymentError}
                      required
                    >
                      {paymentMethods.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {preferredPaymentError
                        ? "Please select a preferred form of payment"
                        : ""}{" "}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={3.25} />
              </Grid>
              <Grid container>
                <Grid item xs={2.75} />
                <Grid item xs={6} margin={1.25}>
                  <TextField
                    required
                    fullWidth
                    select
                    size="small"
                    label="Preferred Form of Contact"
                    onChange={(event) => {
                      setPreferredCommunication(event.target.value);
                      checkPreferredContact(event.target.value)
                        ? setPreferredCommunicationError(true)
                        : setPreferredCommunicationError(false);
                    }}
                    value={preferredCommunication}
                    error={preferredCommunicationError}
                    helperText={
                      preferredCommunicationError
                        ? "Please select a preferred form of contact"
                        : ""
                    }
                  >
                    {formsOfContact.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3.25} />
              </Grid>
              <Grid container>
                <Grid item xs={2.75} />
                <Grid item xs={6} margin={1.25}>
                  <TextField
                    required={
                      preferredCommunication === "Phone" ||
                      preferredCommunication === "Any"
                    }
                    fullWidth
                    label="Phone Number"
                    size="small"
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                      checkPhoneNumber(event.target.value)
                        ? setPhoneNumberError(true)
                        : setPhoneNumberError(false);
                    }}
                    value={phoneNumber}
                    error={phoneNumberError}
                    helperText={
                      phoneNumberError
                        ? "A valid US phone number is required"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={3.25} />
              </Grid>
              <Grid container>
                <Grid item xs={2.75} />
                <Grid item xs={6} margin={1.25}>
                  <TextField
                    required={
                      preferredCommunication === "GroupMe" ||
                      preferredCommunication === "Any"
                    }
                    fullWidth
                    label="GroupMe"
                    size="small"
                    onChange={(event) => {
                      setGroupMe(event.target.value);
                      checkGroupMeURL(event.target.value)
                        ? setGroupMeError(true)
                        : setGroupMeError(false);
                    }}
                    value={groupMe}
                    error={groupMeError}
                    helperText={
                      groupMeError
                        ? "The provided URL must be from groupme.com and use https"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={3.25} />
              </Grid>
              <Grid item xs={12} margin={1.25}>
                <Button className="btn" type="submit" variant="contained">
                  Create Account
                </Button>
              </Grid>
              <small>
                Already have an account? <a href="/login">Login</a> here.
              </small>
            </div>
          </form>
        </Grid>
        <Grid item xs={6}>
          <img src={Logo} alt="" style={{ width: "100%", height: "100%" }} />
        </Grid>
      </Grid>
    </Container>
  );
}

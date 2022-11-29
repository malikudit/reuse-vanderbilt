import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Form.css";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import swal from "sweetalert";
import emailjs from "emailjs-com";

export default function Form(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [printErr, setPrintErr] = useState(false);
  const {
    formState: { errors },
  } = useForm();

  const checkEmail = (name) =>
    !name.match("^[A-Za-z0-9._%+-]+@vanderbilt.edu$");

  const checkPassword = (name) =>
    !name.match(
      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$"
    );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkEmail(email)) {
      setEmailError(true);
      return;
    }
    // if (checkPassword(password)) {
    //   setPasswordError(true);
    //   return;
    // }

    if (emailError === false && passwordError === false) {
      var obj = {};
      obj.email = email;
      obj.password = password;

      async function postData(
        url = "http://localhost:8080/users/login",
        data = obj
      ) {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        return response.json();
      }

      postData("http://localhost:8080/users/login").then((data) => {
        if (data.error) {
          setPrintErr(data.error);
          console.log(data.error);
        } else {
          window.location.href = "/";
        }
      });
    }
  };

  const forgotPassword = () => {
    swal({
      title: "Let's help you reset your password! What's your email?",
      content: "input",
      button: {
        text: "Send",
        closeModal: false,
      },
    })
      .then((email) => {
        if (!email) {
          swal("Error", "Please enter an email!", "error");
          return;
        }
        emailjs
          .send(
            "service_8m4c5ua",
            "template_bixak1k",
            { email: email },
            "Ig2_KfIjR0_6K51qq"
          )
          .then(
            (result) => {
              console.log(result.text);
              swal("Success", "Password reset link sent!", "success");
            },
            (error) => {
              console.log(error.text);
              swal("Error", error.text, "error");
            }
          );
      })
      .catch((err) => {
        if (err) {
          swal("Error", "Email not sent", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  };

  return (
    <Grid className="App">
      <Grid container className="form-design">
        <Grid className="col-1">
          <h2>Welcome back!</h2>
          <span>Sign in, and find what's new on Reuse.</span>
          <form id="form" className="flex flex-col" onSubmit={handleSubmit}>
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
            <TextField
              required
              fullWidth
              label="Password"
              size="small"
              type={"password"}
              onChange={(event) => {
                setPassword(event.target.value);
                // checkPassword(event.target.value)
                //   ? setPasswordError(true)
                //   : setPasswordError(false);
              }}
              value={password}
              // error={passwordError}
              // helperText={passwordError ? "Error with password" : ""}
            />
            <Button className="btn" type="submit" variant="contained">
              Login
            </Button>
            {printErr ? <small className="errorPara">{printErr}</small> : null}
            <small>
              Forgot Password?{" "}
              <Typography
                variant="h8"
                noWrap
                component="Typography"
                onClick={forgotPassword}
                sx={{ color: "blue" }}
              >
                Click Here
              </Typography>
              .
            </small>
            <small>
              Don't have an account?{" "}
              <Typography
                variant="h8"
                noWrap
                component={Link}
                to="/register"
                underline="none"
                sx={{ color: "blue" }}
              >
                Register
              </Typography>{" "}
              here.
            </small>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

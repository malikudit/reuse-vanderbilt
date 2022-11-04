import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import swal from "sweetalert";
import emailjs from "emailjs-com";

export default function Form(props) {
  const [printErr, setPrintErr] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    async function postData(url = "") {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify(values),
      });

      return response.json();
    }

    postData("http://localhost:8080/users/login").then((data) => {
      if (data.error) {
        setPrintErr(data.error);
      } else {
        window.location.href = '/'
      }
    });
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
    <section className="App">
      <div className="form-design">
        <div className="col-1">
          <h2>Welcome back!</h2>
          <span>Sign in, and find what's new on Reuse.</span>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              name="email_address"
              type="text"
              {...register("email", { required: true })}
              placeholder="Email Address"
            />
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {errors.email_address && (
              <small className="errorPara">Email is required</small>
            )}
            {errors.password && (
              <small className="errorPara">Password is required!</small>
            )}
            {printErr !== "" ? (
            <small className="errorPara">{printErr}</small>
            ) : (
            <></>
            )}
            <button className="btn">Login</button>
            <small>
              <a href="#" onClick={forgotPassword}>
                Forgot Password?
              </a>
            </small>
            <small>
              Don't have an account? <a href="/register">Register</a> here.
            </small>
          </form>
        </div>
      </div>
    </section>
  );
}

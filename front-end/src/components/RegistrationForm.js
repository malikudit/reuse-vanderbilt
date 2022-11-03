import React from "react";
import Logo from "../assets/VanderbiltLogo.jpg";
import { useForm } from "react-hook-form";
import "./Form.css";
import swal from "sweetalert";

export default function Form(props) {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();
  const onSubmit = (values) => {
    async function postData(url = "", data = { values }) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        // cache: 'no-cache',
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",
        // referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
      });
      console.log(response.json());
      return response.json(); // parses JSON response into native JavaScript objects
    }

    postData("http://localhost:8080", { answer: "Parwaz" }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });

    swal("Success", "Account created", "success").then(function () {
      window.location.href = "/login";
    });
  };

  return (
    <section className="App">
      <div className="form-design">
        <div className="col-1">
          <h2>Welcome to Reuse Vandy!</h2>
          <span>Get started with an account now.</span>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("firstName")}
              placeholder="First Name"
            />
            <input
              type="text"
              {...register("lastName")}
              placeholder="Last Name"
            />
            <input
              type="text"
              {...register("email")}
              placeholder="Email Address"
            />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
            />
            <input
              type="password"
              {...register("confirm_password")}
              placeholder="Confirm Password"
            />
            <button className="btn">Create Account</button>
            <small>
              Already have an account? <a href="/login">Login</a> here.
            </small>
          </form>
        </div>
        <div className="col-2">
          <img src={Logo} alt="" />
        </div>
      </div>
    </section>
  );
}

import React from "react";
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
    swal("Success", "Password reset!", "success").then(function () {
      window.location.href = "/login";
    });
    console.log(values);
  };

  return (
    <section className="App">
      <div className="form-design">
        <div className="col-1">
          <h2>Reset your password here!</h2>
          <span>Don't forget it again, now.</span>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="password"
              {...register("new_password")}
              placeholder="New Password"
            />
            <input
              type="password"
              {...register("confirm_new_password")}
              placeholder="Confirm Password"
            />
            <button className="btn">Start Reuse'ing again!</button>
          </form>
        </div>
      </div>
    </section>
  );
}

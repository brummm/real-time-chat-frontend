import React from "react";
import InputText from "../Form/InputText";
import "./SignInOrSignUp.scss";
export const SignIn = () => {
  return (
    <div className="container">
      <h1 className="title">Sign In</h1>
      <div className="container">
        <form>
          <InputText label="Username" name="username" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;

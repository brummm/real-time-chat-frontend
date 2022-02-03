import React, { useState } from "react";
import Page from "../Page";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export const SignInOrSignUp = () => {
  const [wantToSignIn, setWantToSignIn] = useState(true);
  return (
    <Page>
      <div className="signInOrSignUp">
        {wantToSignIn && <SignIn />}
        {!wantToSignIn && <SignUp />}
      </div>
    </Page>
  );
};

export default SignInOrSignUp;

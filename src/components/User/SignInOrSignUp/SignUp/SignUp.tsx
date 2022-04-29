import { WinkSmile } from "@styled-icons/boxicons-solid";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../../contexts/UserContext";
import { useLoadAPI } from "../../../../lib/api";
import axios from "../../../../lib/axios";
import InsideContainer from "../../../Containers/InsideContainer/InsideContainer";
import OutsideContainer from "../../../Containers/OutsideContainer/OutsideContainer";
import ErrorMessage from "../../../Error/ErrorMessage/ErrorMessage";
import { ButtonLink } from "../../../Form/Button/Button";
import Loading from "../../../Loading/Loading";
import Title from "../../../Texts/Title/Title";
import "../SignInOrSignUp.scss";
import "./SignUp.scss";
import SignUpForm from "./SignUpForm/SignUpForm";

export const SignUp: React.FC = () => {
  const { user, setUser } = useUserContext();
  const {
    call: signUp,
    loading,
    data,
    error,
  } = useLoadAPI((params: any) => axios.post("/users/register", params));

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user);
    }
  }, [data, setUser]);

  return (
    <div className="SignInOrSignUp SignUp">
      <OutsideContainer>
        <Title>Sign Up</Title>
        <InsideContainer>
          {!user && <SignUpForm afterSubmit={signUp} />}
          {user && (
            <div className="userCreated">
              <h2>Hello, {user.firstName}!</h2>
              <p>Your user was just created.</p>
              <ButtonLink to="/chats" icon={WinkSmile}>
                Start chatting!
              </ButtonLink>
            </div>
          )}
          {loading && <Loading />}
          {error && (
            <div className="errorMessage">
              <ErrorMessage message={error} />
            </div>
          )}

          {!user && (
            <div className="link">
              <Link to="/sign-in">I want to sign in.</Link>
            </div>
          )}
        </InsideContainer>
      </OutsideContainer>
    </div>
  );
};

export default SignUp;

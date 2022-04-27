import { LogInCircle, MailSend } from "@styled-icons/boxicons-regular";
import { Lock } from "@styled-icons/boxicons-solid";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../contexts/UserContext";
import { useLoadAPI } from "../../../../lib/api";
import axios from "../../../../lib/axios";
import { validateEmail, validatePassword } from "../../../../lib/models/user";
import InsideContainer from "../../../Containers/InsideContainer/InsideContainer";
import OutsideContainer from "../../../Containers/OutsideContainer/OutsideContainer";
import ErrorMessage from "../../../Error/ErrorMessage/ErrorMessage";
import Button from "../../../Form/Button/Button";
import InputText, { InputTextState } from "../../../Form/InputText/InputText";
import Loading from "../../../Loading/Loading";
import Title from "../../../Texts/Title/Title";
import "../SignInOrSignUp.scss";

export const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<InputTextState>({});
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [signIn, loading, data, error] = useLoadAPI((params: any) =>
    axios.post("/users/login", params)
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: any = {
      equipmentId: "equipmentId",
    };
    for (let field in formData) {
      data[field] = formData[field].value;
    }
    signIn(data);
  };

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user);
      navigate("/chats");
    }
  }, [data, navigate, setUser]);

  return (
    <div className="SignInOrSignUp">
      <OutsideContainer>
        <Title>Sign In</Title>
        <InsideContainer>
          <form onSubmit={onSubmit}>
            {error && (
              <div className="errorMessage">
                <ErrorMessage message={error} />
              </div>
            )}
            <div className="input">
              <InputText
                label="E-mail"
                validate={validateEmail}
                name="email"
                icon={MailSend}
                state={[formData, setFormData]}
              />
            </div>
            <div className="input">
              <InputText
                label="Password"
                name="password"
                icon={Lock}
                type="password"
                validate={validatePassword}
                state={[formData, setFormData]}
              />
            </div>
            <div className="button">
              <Button label="Sign me In" type="submit" icon={LogInCircle} />
            </div>
            <div className="link">
              <Link to="/sign-up">I want to sign up.</Link>
            </div>
          </form>
          {loading && <Loading />}
        </InsideContainer>
      </OutsideContainer>
    </div>
  );
};

export default SignIn;

import { LogInCircle, MailSend } from "@styled-icons/boxicons-regular";
import { Lock, User } from "@styled-icons/boxicons-solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession, signIn } from "../../lib/api";
import { validatePassword, validateEmail } from "../../lib/models/user";
import Button from "../Form/Button";
import InputText, { InputTextState } from "../Form/InputText";
import Page from "../Page";
import "./SignInOrSignUp.scss";

export const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<InputTextState>({});
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: any = {
      equipmentId: "equipmentId",
    };
    for (let field in formData) {
      data[field] = formData[field].value;
    }
    const response = await signIn(data);
    if (response) {
      navigate("/chats");
    }
  };
  return (
    <Page>
      <div className="SignInOrSignUp">
        <div className="container">
          <h1 className="title">Sign In</h1>
          <div className="container">
            <form onSubmit={onSubmit}>
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
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  I want to sign up.
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignIn;

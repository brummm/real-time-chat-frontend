import { LogInCircle, MailSend } from "@styled-icons/boxicons-regular";
import { Lock } from "@styled-icons/boxicons-solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/user-context";
import { Api, useLoadAPI } from "../../../lib/api";
import { validateEmail, validatePassword } from "../../../lib/models/user";
import Button from "../../Form/Button";
import InputText, { InputTextState } from "../../Form/InputText";
import Loading from "../../Loading";
import "./SignInOrSignUp.scss";

export const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<InputTextState>({});
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [signIn, loading, data, error] = useLoadAPI((params: any) =>
    Api.post("/users/login", params)
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
  }, [data, setUser]);

  // TODO: show error
  return (
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                I want to sign up.
              </button>
            </div>
          </form>
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default SignIn;

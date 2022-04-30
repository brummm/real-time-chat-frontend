import { LogInCircle, MailSend } from "@styled-icons/boxicons-regular";
import { Lock } from "@styled-icons/boxicons-solid";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useUserContext } from "../../../../contexts/UserContext";
import { useLoadAPI } from "../../../../lib/api";
import axios from "../../../../lib/axios";
import InsideContainer from "../../../Containers/InsideContainer/InsideContainer";
import OutsideContainer from "../../../Containers/OutsideContainer/OutsideContainer";
import ErrorMessage from "../../../Error/ErrorMessage/ErrorMessage";
import Button from "../../../Form/Button/Button";
import InputText, { InputTextState } from "../../../Form/InputText/InputText";
import Loading from "../../../Loading/Loading";
import Title from "../../../Texts/Title/Title";
import "../SignInOrSignUp.scss";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("E-mail is required.")
    .email("Must be a valid e-mail address."),
  password: yup.string().required("Password is required."),
});

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const {
    call: signIn,
    loading,
    data,
    error,
  } = useLoadAPI((params: any) => axios.post("/users/login", params));

  const onSubmit = async (values: any) => {
    const data: any = {
      ...values,
      equipmentId: "equipmentId",
    };
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
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="errorMessage">
                    <ErrorMessage message={error} />
                  </div>
                )}
                <div className="input">
                  <InputText
                    label="E-mail"
                    error={errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                    icon={MailSend}
                  />
                </div>
                <div className="input">
                  <InputText
                    label="Password"
                    name="password"
                    icon={Lock}
                    type="password"
                    error={errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                <div className="button">
                  <Button label="Sign me In" type="submit" icon={LogInCircle} />
                </div>
                <div className="link">
                  <Link to="/sign-up">I want to sign up.</Link>
                </div>
              </form>
            )}
          </Formik>
          {loading && <Loading />}
        </InsideContainer>
      </OutsideContainer>
    </div>
  );
};

export default SignIn;

import { LogInCircle, MailSend } from "@styled-icons/boxicons-regular";
import { Lock } from "@styled-icons/boxicons-solid";
import { Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../../../../contexts/AuthContext";
import { useQueryString } from "../../../../hooks/useQueryString";
import InsideContainer from "../../../Containers/InsideContainer/InsideContainer";
import OutsideContainer from "../../../Containers/OutsideContainer/OutsideContainer";
import ErrorMessage from "../../../Error/ErrorMessage/ErrorMessage";
import Button from "../../../Form/Button/Button";
import InputText from "../../../Form/InputText/InputText";
import Loading from "../../../Loading/Loading";
import Title from "../../../Texts/Title/Title";
import "../SignInOrSignUp.scss";

export const REDIRECT_ATTR_NAME = "redirectTo";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("E-mail is required.")
    .email("Must be a valid e-mail address."),
  password: yup.string().required("Password is required."),
});

export const SignIn: React.FC<{
  defaultRedirect?: string;
  showSignUpLink?: boolean;
}> = ({ defaultRedirect = "/chats", showSignUpLink = true }) => {
  const navigate = useNavigate();
  const { signInMutation, isAuthenticated } = useAuth();
  const query = useQueryString();
  const redirectTo = useRef(query.get(REDIRECT_ATTR_NAME) || defaultRedirect);

  const { isLoading, isError, mutate: signIn, error } = signInMutation;

  const onSubmit = async (values: any) => {
    try {
      await signIn(values);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = redirectTo.current;
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="SignInOrSignUp">
      <OutsideContainer size="small">
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
                {isError && error && (
                  <div className="errorMessage">
                    <ErrorMessage
                      message={error.response?.data.error || error.message}
                    />
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
                {showSignUpLink && (
                  <div className="link">
                    <Link to="/sign-up">I want to sign up.</Link>
                  </div>
                )}
              </form>
            )}
          </Formik>
          {isLoading && <Loading />}
        </InsideContainer>
      </OutsideContainer>
    </div>
  );
};

export default SignIn;

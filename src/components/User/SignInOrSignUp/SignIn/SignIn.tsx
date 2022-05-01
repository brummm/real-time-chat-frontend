import { LogInCircle, MailSend } from "@styled-icons/boxicons-regular";
import { Lock } from "@styled-icons/boxicons-solid";
import { AxiosError } from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useUserContext } from "../../../../contexts/UserContext";
import axios from "../../../../lib/axios";
import { User } from "../../../../lib/models/user";
import InsideContainer from "../../../Containers/InsideContainer/InsideContainer";
import OutsideContainer from "../../../Containers/OutsideContainer/OutsideContainer";
import ErrorMessage from "../../../Error/ErrorMessage/ErrorMessage";
import Button from "../../../Form/Button/Button";
import InputText from "../../../Form/InputText/InputText";
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
    mutate: signIn,
    isLoading,
    data: user,
    isError,
    error,
  } = useMutation<User, AxiosError, User>(
    async (params: User): Promise<User> => {
      const { data } = await axios.post("/users/login", params);
      return data.user;
    }
  );

  const onSubmit = async (values: any) => {
    const data: any = {
      ...values,
      equipmentId: "equipmentId",
    };
    signIn(data);
  };

  useEffect(() => {
    if (user) {
      setUser(user);
      navigate("/chats");
    }
  }, [user, navigate, setUser]);

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
                {isError && error && (
                  <div className="errorMessage">
                    <ErrorMessage message={error.message} />
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
          {isLoading && <Loading />}
        </InsideContainer>
      </OutsideContainer>
    </div>
  );
};

export default SignIn;

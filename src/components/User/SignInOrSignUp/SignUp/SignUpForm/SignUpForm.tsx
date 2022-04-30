import {
  LogInCircle,
  MailSend,
  User as UserRegular,
} from "@styled-icons/boxicons-regular";
import { Lock, User } from "@styled-icons/boxicons-solid";
import { Formik } from "formik";
import React, { useCallback } from "react";
import { validations } from "../../../../../lib/models/user";
import Button from "../../../../Form/Button/Button";
import InputText from "../../../../Form/InputText/InputText";

interface Props {
  afterSubmit: CallableFunction;
}
export const SignUpForm: React.FC<Props> = ({ afterSubmit }) => {
  const onSubmit = useCallback(
    (values) => {
      afterSubmit({ user: values });
    },
    [afterSubmit]
  );

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        birth: "",
      }}
      validationSchema={validations}
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
          <div className="emailAndPassword">
            <div className="input">
              <InputText
                label="Username"
                name="userName"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                icon={User}
                value={values.userName}
                error={touched.userName ? errors.userName : ""}
              />
            </div>
            <div className="input">
              <InputText
                label="E-mail"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                icon={MailSend}
                value={values.email}
                error={errors.email}
              />
            </div>
            <div className="input">
              <InputText
                label="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                icon={Lock}
                type="password"
                required
                value={values.password}
                error={errors.password}
              />
            </div>
            <div className="input">
              <InputText
                label="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                icon={Lock}
                type="password"
                required
                value={values.confirmPassword}
                error={errors.confirmPassword}
              />
            </div>
          </div>

          <div className="input">
            <InputText
              label="First Name"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon={UserRegular}
              value={values.firstName}
              error={errors.firstName}
            />
          </div>
          <div className="input">
            <InputText
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              icon={UserRegular}
              value={values.lastName}
              error={errors.lastName}
            />
          </div>

          <div className="input">
            <InputText
              type="date"
              label="Birth Date"
              name="birth"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              value={values.birth}
              error={errors.birth}
            />
          </div>
          <div className="button">
            <Button label="Sign me Up" type="submit" icon={LogInCircle} />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;

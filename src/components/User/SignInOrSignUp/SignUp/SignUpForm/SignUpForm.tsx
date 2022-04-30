import {
  LogInCircle,
  MailSend,
  User as UserRegular,
} from "@styled-icons/boxicons-regular";
import { Lock, User } from "@styled-icons/boxicons-solid";
import { Formik } from "formik";
import React, { useCallback, useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../../../../lib/models/user";
import Button from "../../../../Form/Button/Button";
import InputText, {
  InputTextState,
} from "../../../../Form/InputText/InputText";

interface Props {
  afterSubmit: CallableFunction;
}
export const SignUpForm: React.FC<Props> = ({ afterSubmit }) => {
  const [formData, setFormData] = useState<InputTextState>({});

  const onSubmit = useCallback(() => {
    const params: any = {};
    for (let field in formData) {
      params[field] = formData[field].value;
    }

    afterSubmit({ user: params });
  }, [afterSubmit, formData]);

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        birth: "",
      }}
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
        <form onSubmit={onSubmit}>
          <div className="emailAndPassword">
            <div className="input">
              <InputText
                label="Username"
                validate={validateUsername}
                name="userName"
                required
                icon={User}
                state={[formData, setFormData]}
              />
            </div>
            <div className="input">
              <InputText
                label="E-mail"
                validate={validateEmail}
                name="email"
                required
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
                required
                validate={validatePassword}
                state={[formData, setFormData]}
              />
            </div>
          </div>

          <div className="input">
            <InputText
              label="First Name"
              name="firstName"
              required
              icon={UserRegular}
              state={[formData, setFormData]}
            />
          </div>
          <div className="input">
            <InputText
              label="Last Name"
              name="lastName"
              required
              icon={UserRegular}
              state={[formData, setFormData]}
            />
          </div>

          <div className="input">
            <InputText
              type="date"
              label="Birth Date"
              name="birth"
              required
              state={[formData, setFormData]}
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

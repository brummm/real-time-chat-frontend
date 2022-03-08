import {
  LogInCircle,
  MailSend,
  User as UserRegular,
} from "@styled-icons/boxicons-regular";
import { Lock, User } from "@styled-icons/boxicons-solid";
import { error } from "console";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../../../../lib/models/user";
import signUp from "../../../../../routes/sign-up";
import ErrorMessage from "../../../../Error/ErrorMessage/ErrorMessage";
import Button from "../../../../Form/Button/Button";
import InputText, {
  InputTextState,
} from "../../../../Form/InputText/InputText";

interface Props {
  afterSubmit: CallableFunction;
}
export const SignUpForm: React.FC<Props> = ({ afterSubmit }) => {
  const [formData, setFormData] = useState<InputTextState>({});

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const params: any = {};
      for (let field in formData) {
        params[field] = formData[field].value;
      }
      console.log(params, formData);

      afterSubmit({ user: params });
    },
    [afterSubmit, formData]
  );

  return (
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
  );
};

export default SignUpForm;

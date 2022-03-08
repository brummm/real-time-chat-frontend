import { validateLength } from "../validations";

export const EMAIL_VALIDATIONS = {
  length: {
    min: 6,
  },
};
export const validateEmail = (input: string) => {
  if (
    input.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return true;
  } else {
    throw Error(`Your e-mail does not seem valid.`);
  }
};

export const USERNAME_VALIDATIONS = {
  length: {
    min: 6,
    max: 12,
  },
};
export const validateUsername = (input: string) => {
  validateLength(input, USERNAME_VALIDATIONS.length, "Username");
};

export const PASSWORD_VALIDATIONS = {
  length: {
    min: 6,
    max: 35,
  },
};
export const validatePassword = (input: string) => {
  validateLength(input, PASSWORD_VALIDATIONS.length, "Password");
};

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  level: string;
  birth: string;
}

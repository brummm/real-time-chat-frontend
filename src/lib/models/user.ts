import * as yup from "yup";

export const validations = yup.object({
  email: yup.string().required().email().label("E-mail"),
  userName: yup
    .string()
    .required()
    .min(6, "Must be, at least, 6 letters.")
    .max(12),
  password: yup
    .string()
    .required()
    .min(6, "Must be, at least, 6 letters.")
    .max(35)
    .label("Password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Confirm Password is required"),
  firstName: yup.string().required().label("First Name"),
  lastName: yup.string().required().label("Last Name"),
  birth: yup.date().max(new Date()).required().label("Birth Date"),
});

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: string;
  birth: string;
  multiavatar: string;
}

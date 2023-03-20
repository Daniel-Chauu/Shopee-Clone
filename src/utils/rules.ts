import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .email("Email isn't valid")
    .required("Plesea enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Password should be than 6 character "),
  confirm_password: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must and should match"),
});

export type Schema = yup.InferType<typeof schema>;

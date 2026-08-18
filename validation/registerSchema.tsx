import * as yup from "yup";

export const registerSchema = yup.object({
  userName: yup
    .string()
    .trim()
    .required("Username is required")
    .min(2, "Username must contain at least 2 characters"),

  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 6 characters"),
});

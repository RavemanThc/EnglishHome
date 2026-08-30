import * as yup from "yup";

export const submitSchema = yup.object({
  reason: yup.string().required("Choose your reason"),

  userName: yup
    .string()
    .trim()
    .required("Username is required")
    .min(2, "Username must contain at least 2 characters")
    .max(30, "Username very long"),

  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?[0-9\s()-]{10,20}$/, "Enter a valid phone number"),
});

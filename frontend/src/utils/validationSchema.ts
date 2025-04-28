/** @format */

// src/utils/validationSchema.ts
import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "Name must be at least 20 characters")
    .max(20, "Name must be at most 60 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  address: yup
    .string()
    .max(400, "Address can be at most 400 characters")
    .required("Address is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must include at least one special character"
    )
    .required("Password is required"),
  role: yup
    .string()
    .oneOf(["user", "owner"], "Role must be either admin, user, or owner")
    .required("Role is required"),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must include at least one special character"
    )
    .required("Password is required"),
});

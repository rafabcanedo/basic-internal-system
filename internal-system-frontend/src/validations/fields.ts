import * as yup from "yup";

const messages = {
  required: "This field is required.",
  email: "Please enter a valid email.",
  passwordMin: "Password must be at least 6 characters long.",
  nameMin: "Name must be at least 6 characters long.",
  phoneInvalid: "Phone is invalid.",
};

export const emailField = () =>
  yup.string().email(messages.email).required(messages.required);

export const passwordField = (min = 6) =>
  yup.string().min(min, messages.passwordMin).required(messages.required);

export const nameField = (min = 6) =>
  yup.string().min(min, messages.nameMin).required(messages.required);

export const phoneField = () =>
  yup
    .string()
    .matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, messages.phoneInvalid)
    .required(messages.required);

export const optional = <T extends yup.AnySchema>(schema: T) => schema.optional();

export const trimmed = <T extends yup.StringSchema>(schema: T) =>
  schema.transform((v) => (typeof v === "string" ? v.trim() : v));

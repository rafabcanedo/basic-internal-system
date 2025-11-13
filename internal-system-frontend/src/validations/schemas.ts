import * as yup from "yup";
import { emailField, passwordField, nameField, phoneField, trimmed } from "./fields";

export const signInSchema = yup.object({
  email: trimmed(emailField()),
  password: passwordField(6),
});

export const signUpSchema = yup.object({
  name: trimmed(nameField(6)),
  email: trimmed(emailField()),
  password: passwordField(6),
  phone: trimmed(phoneField()),
});

export const forgotPasswordSchema = yup.object({
  email: trimmed(emailField()),
});

export const profileSchema = yup.object({
  name: trimmed(nameField(2)).optional(),
  email: trimmed(emailField()).optional(),
  password: passwordField(6).optional(),
  phone: trimmed(phoneField()).optional(),
  street: yup.string().optional(),
  neighborhood: yup.string().optional(),
  zip: yup.string().optional(),
});

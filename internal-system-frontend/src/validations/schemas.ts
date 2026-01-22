import * as yup from "yup";
import { emailField, passwordField, nameField, phoneField, trimmed, valueField, percentField } from "./fields";
import { ContactCategory, CostCategory } from "@/types";

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

export const addContactSchema = yup.object({
  name: trimmed(nameField(2)),
  email: trimmed(emailField()),
  phone: trimmed(phoneField()),
  category: yup
    .mixed<ContactCategory>()
    .oneOf(Object.values(ContactCategory), "Invalid category")
    .required("Category is required"),
});

export const addCostSchema = yup.object({
  contactId: trimmed(yup.string().uuid("Invalid contact ID").required("Contact is required")),
  value: trimmed(valueField()),
  percent: yup
    .string()
    .required("Percent is required")
    .test("is-percent", "Invalid percentage. Must be between 0 and 100", (val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    }),
  category: yup
    .mixed<CostCategory>()
    .oneOf(Object.values(CostCategory), "Invalid category")
    .required("Category is required"),
});
import type { RegisterOptions } from "react-hook-form";

export type LoginInputs = {
  email: string;
  password: string;
};

export const emailRegisterOptions: RegisterOptions<LoginInputs, "email"> = {
  required: "Email is required",

  validate: {
    isEmailFormat: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email format",

    isGmail: (value) =>
      /@gmail\.com$/.test(value) || "Only Gmail addresses are allowed",

    validChars: (value) =>
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ||
      "Username contains invalid characters",

    noDoubleDots: (value) =>
      !/\.\./.test(value) || "Email cannot contain consecutive dots",

    noEdgeDot: (value) =>
      /^(?!\.)(?!.*\.$)/.test(value) || "Email cannot start or end with a dot",
  },
};

export const passwordRegisterOptions: RegisterOptions<LoginInputs, "password"> =
  {
    required: "Password is required",
    validate: {
      minLength: (v) => /^.{8,}$/.test(v) || "At least 8 characters required",

      uppercase: (v) => /[A-Z]/.test(v) || "Must contain uppercase letter",

      lowercase: (v) => /[a-z]/.test(v) || "Must contain lowercase letter",

      number: (v) => /\d/.test(v) || "Must contain a number",

      special: (v) =>
        /[!@#$%^&*(),.?":{}|<>]/.test(v) || "Must contain a special character",
    },
  };

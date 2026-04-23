import type { RegisterOptions, Validate } from "react-hook-form";

export type SignupInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const nameValidation: (
  type: "First" | "Last",
) =>
  | Validate<string, SignupInputs>
  | Record<string, Validate<string, SignupInputs>> = (type) => {
  return {
    onlyLetters: (v) =>
      /^[A-Za-z'-]+$/.test(v) || "Only letters, - and ' allowed",

    noSpaces: (v) => !/\s/.test(v) || `${type} name must not contain spaces`,

    minLength: (v) => v.length >= 2 || "Must be at least 2 characters",
  };
};

export const firstNameRegisterOptions: RegisterOptions<SignupInputs, "email"> =
  {
    required: "First name is required",
    validate: nameValidation("First"),
  };
export const lastNameRegisterOptions: RegisterOptions<SignupInputs, "email"> = {
  required: "Last name is required",
  validate: nameValidation("Last"),
};

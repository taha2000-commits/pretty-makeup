import type { SignupInputs } from "../../../pages/auth/signup/validations";
import { supabase } from "../init";

export const signup = async ({
  email,
  password,
  firstName,
  lastName,
}: SignupInputs) => {
  console.log({
    email,
    password,
    options: {
      data: {
        firstName: firstName,
        lastName: lastName,
        username: firstName + " " + lastName,
      },
    },
  });
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName: firstName,
        lastName: lastName,
        username: firstName + " " + lastName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

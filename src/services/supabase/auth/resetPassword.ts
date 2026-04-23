import { supabase } from "../init";

export const sendConfirmationToEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/auth/reset-password",
  });
  if (error) throw new Error(error.message);

  return data;
};

export const resetPassword = async (newPassword: string) => {
  supabase.auth.onAuthStateChange(async (event) => {
    if (event == "PASSWORD_RECOVERY") {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      console.log(data);

      if (data) alert("Password updated successfully!");
      if (error) alert("There was an error updating your password.");
    }
  });
};

import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/supabase/auth/signup";

export const useSignup = () => {
  const data = useMutation({
    mutationFn: signup,
  });
  return { ...data, signup: data.mutate };
};

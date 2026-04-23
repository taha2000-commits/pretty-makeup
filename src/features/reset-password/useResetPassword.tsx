import { useMutation } from "@tanstack/react-query";
import {
  resetPassword,
  sendConfirmationToEmail,
} from "../../services/supabase/auth/resetPassword";
import { useNavigate } from "react-router";

export const useSendConfirmationToEmail = () => {
  const data = useMutation({
    mutationFn: sendConfirmationToEmail,
  });
  return { ...data, sendConfirmationToEmail: data.mutate };
};

export const useResetPassword = () => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      nav("/auth/login");
    },
  });
};

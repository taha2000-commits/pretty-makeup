import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithPassword } from "../../services/supabase/auth/login";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const qClient = useQueryClient();
  const nav = useNavigate();
  const data = useMutation({
    mutationKey: ["login"],
    mutationFn: signInWithPassword,
    onSettled: () => {
      qClient
        .invalidateQueries({ queryKey: ["user"] })
        .then(() => nav("/auth/login"));
    },
  });
  return { ...data, login: data.mutate };
};

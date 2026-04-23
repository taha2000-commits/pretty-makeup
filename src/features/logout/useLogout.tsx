import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/supabase/auth/logout";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const qClient = useQueryClient();
  const nav = useNavigate();
  const data = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSettled: () => {
      qClient
        .invalidateQueries({ queryKey: ["user"] })
        .then(() => nav("/auth/login"));
    },
  });
  return { ...data, logout: data.mutate };
};

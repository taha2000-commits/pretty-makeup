import {  useSuspenseQuery } from "@tanstack/react-query";
import { getUser } from "../../services/supabase/auth/use-session";

export const useUser = () => {
  return useSuspenseQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

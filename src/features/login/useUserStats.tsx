import {  useQuery } from "@tanstack/react-query";
import { getUserStats } from "../../services/supabase/auth/user-stats";

export const useUserStats = () => {
  return useQuery({
    queryKey: ["user_stats"],
    queryFn: getUserStats,
  });
};

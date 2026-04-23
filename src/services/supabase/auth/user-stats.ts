import type { UserStats } from "../../../types/user-stats";
import { supabase } from "../init";

export const getUserStats: () => Promise<UserStats> = async () => {
  const { data: user_stats, error } = await supabase
    .from("user_stats")
    .select("*");
  if (error) throw new Error(error.message);
  return user_stats[0];
};

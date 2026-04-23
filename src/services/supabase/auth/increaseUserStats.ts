import type { UserStatsCols } from "../../../types/user-stats";
import { supabase } from "../init";

export const increaseUserStats = async (col_name: UserStatsCols) => {
  const { data, error } = await supabase.rpc("increment_user_stats", {
    col_name,
  });
  if (error) throw new Error(error.message);
  return data;
};

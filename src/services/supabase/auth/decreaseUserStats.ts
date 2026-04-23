import type { UserStatsCols } from "../../../types/user-stats";
import { supabase } from "../init";

export const decreaseUserStats = async (col_name: UserStatsCols) => {
  const { data, error } = await supabase.rpc("decrement_user_stats", {
    col_name,
  });
  if (error) throw new Error(error.message);
  return data;
};

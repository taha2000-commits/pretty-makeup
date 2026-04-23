import { supabase } from "../init";

export const updateUserStats = async () => {
  const { data, error } = await supabase.rpc("refresh_user_stats");
  if (error) throw new Error(error.message);
  return data;
};

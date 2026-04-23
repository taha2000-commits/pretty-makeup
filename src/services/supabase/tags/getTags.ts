import type { Tag } from "../../../types/tags";
import { supabase } from "../init";

export const getTags: () => Promise<Tag[]> = async () => {
  const { data, error } = await supabase.from("tags").select("*");
  if (error) throw new Error(error.message);
  return data;
};

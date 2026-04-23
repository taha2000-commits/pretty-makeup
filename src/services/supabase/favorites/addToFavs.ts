import type { Favorites } from "../../../types/favorites";
import { supabase } from "../init";

export const addToFavs = async (favorite: Favorites) => {
  const { data, error } = await supabase.from("favorites").insert([favorite]);

  if (error) throw error;
  return data;
};

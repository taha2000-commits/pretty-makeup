import type { Favorites } from "../../../types/favorites";
import { supabase } from "../init";



export const getFavs: () => Promise<Favorites[]> = async () => {
  const { data: favorites, error } = await supabase
    .from("favorites")
    .select("*");
  if (error) throw new Error(error.message);
  return favorites;
};

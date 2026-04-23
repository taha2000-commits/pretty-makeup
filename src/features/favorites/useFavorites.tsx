import {  useSuspenseQuery } from "@tanstack/react-query";
import { getFavs } from "../../services/supabase/favorites/getFavs";

export const useFavorites = () => {
  return useSuspenseQuery({
    queryKey: ["favorites"],
    queryFn: getFavs,
  });
};

import type { Brand } from "../../../types/brands";
import { supabase } from "../init";

export const getBrands: () => Promise<Brand[]> = async () => {
  const token = import.meta.env.VITE_LOGO_DEV_PUBLIC_KEY;

  const { data: brands, error } = await supabase.from("brands").select("*");

  if (error) throw new Error(error.message);

  const cc = (brands as Brand[]).map((brand) => {
    return { ...brand, logo_url: brand.logo_url + "?token=" + token };
  });

  return cc;
};

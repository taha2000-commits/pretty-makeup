import type { Brand } from "../../../types/brands";
import { supabase } from "../init";

export const getBrandByName: (brand_name: string) => Promise<Brand> = async (
  brand_name,
) => {
  const token = import.meta.env.VITE_LOGO_DEV_PUBLIC_KEY;
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("brand_name", brand_name);
  const brand = data?.[0];
  if (error) throw new Error(error.message);

  return { ...brand, logo_url: brand.logo_url + "?token=" + token };
};

import type { Product } from "../../../types/product";
import type { Params } from "../../../types/params";
import api from "../api";
import { prepareParams } from "../../../utils/helpers";
import { supabase } from "../../supabase/init";

export const getProducts: (params?: Params) => Promise<Product[]> = async (
  params,
) => {
  const { data } = await api.get(
    `https://makeup-api.herokuapp.com/api/v1/products.json`,
    { params: prepareParams(params) },
  );

  const { data: inFav } = await supabase.rpc("check_products", {
    p_ids: (data as Product[]).map((product) => product.id),
  });

  return (data as Product[]).map((d, i) => {
    return { ...d, isFav: inFav?.[i].is_found };
  });
};

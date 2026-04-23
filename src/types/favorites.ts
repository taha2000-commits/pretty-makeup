import type { Product } from "./product";

export type Favorites = {
  id: number;
  product: Product;
  isFav: boolean;
  product_id: number;
  user_id?: string;
};

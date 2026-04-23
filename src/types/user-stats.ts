export enum UserStatsCols {
  FAVS_COUNT = "favs_count",
  ORDERS_COUNT = "orders_count",
  CART_COUNT = "cart_count",
}
export interface UserStats {
  favs_count: number;
  orders_count: number;
  cart_count: number;
}

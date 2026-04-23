import type { Address } from "./address";
import type { Color, Product } from "./product";

export enum OrderStatus {
  CANCELLED = "cancelled",
  INPROGRESS = "in progress",
  DELIVERED = "delivered",
}

export interface Order {
  id?: number;
  created_at?: string;
  user_id?: string;
  status?: OrderStatus;
  total_price: number | null;
  products: {
    product: Product;
    quantity: number;
    selected_color: Color;
  }[];
  coupon_id?: string;
  discount_amount?: number;
  address?: Address;
}

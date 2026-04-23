export enum CouponType {
  FIXED = "fixed",
  PERCENT = "percent",
}
export interface Coupon {
  id: string;
  code: string;
  value: number;
  type: CouponType;
  max_uses: number;
  used_count: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}
export interface CouponUser {
  id?: string;
  user_id?: string;
  coupon_id: string;
  used_at?: string;
  coupon_data: Coupon;
}

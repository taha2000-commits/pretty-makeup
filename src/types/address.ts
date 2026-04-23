export interface Address {
  id: string;
  created_at: string;
  country: string;
  governorate: string;
  city: string;
  street: string;
  building: string;
  is_default: boolean;
  user_id?:string;
}

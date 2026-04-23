export type Pagination = {
  page: number;
  pageSize: number;
};
export type Params = {
  product_type?: string;
  product_tags?: string;
  brand?: string;
  product_category?: string;
  price_less_than?: string;
  price_greater_than?: string;
};

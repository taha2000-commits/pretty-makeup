import { use } from "react";
import { ProductPageContext } from "./ProductPageContext.1";

export const useProductPageContext = () => {
  return use(ProductPageContext);
};

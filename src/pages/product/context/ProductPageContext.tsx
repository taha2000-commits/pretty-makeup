import { useState, type PropsWithChildren } from "react";
import type { Color, Product } from "../../../types/product";
import { ProductPageContext } from "./ProductPageContext.1";

export const ProductPageContextProvider = ({
  children,
  product,
}: { product: Product } & PropsWithChildren) => {
  const [chosenColor, setChosenColor] = useState<Color>(
    product.product_colors[0],
  );


  const [chosenQuantity, setChosenQuantity] = useState<number>(1);
  const [sectionIndx, setSectionIndx] = useState<number>(1);
  return (
    <ProductPageContext
      value={{
        product,
        chosenQuantity,
        setChosenQuantity,
        sectionIndx,
        setSectionIndx,
        chosenColor,
        setChosenColor,
      }}
    >
      {children}
    </ProductPageContext>
  );
};

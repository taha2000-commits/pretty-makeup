import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Color, Product } from "../../../types/product";

const defaultValue: {
  product: Product;
  chosenQuantity: number;
  setChosenQuantity: Dispatch<SetStateAction<number>>;
  sectionIndx: number;
  setSectionIndx: Dispatch<SetStateAction<number>>;
  chosenColor: Color;
  setChosenColor: Dispatch<SetStateAction<Color>>;
} = {
  chosenQuantity: 1,
  setChosenQuantity: () => {},
  sectionIndx: 1,
  setSectionIndx: () => {},
  chosenColor: {
    hex_value: "",
    colour_name: "",
  },
  setChosenColor: () => {},
  product: {
    id: 0,
    brand: "",
    name: "",
    price: "",
    price_sign: null,
    currency: null,
    image_link: "",
    product_link: "",
    website_link: "",
    description: null,
    rating: null,
    category: "",
    product_type: "",
    tag_list: [],
    created_at: "",
    updated_at: "",
    product_api_url: "",
    api_featured_image: "",
    product_colors: [],
    isFav: false,
  },
};

export const ProductPageContext = createContext(defaultValue);

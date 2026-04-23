import { createContext, type Dispatch, type SetStateAction } from "react";

export type FiltersContextStateType = {
  pagination: { page: number; pageSize: number };
  setPagination: Dispatch<SetStateAction<{ page: number; pageSize: number }>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  handleSetType: (categoryType: string) => void;
  handleSetBrand: (brand_name: string) => void;
  brand: string;
  setBrand: Dispatch<SetStateAction<string>>;
  price: {
    lessThan: string;
    moreThan: string;
  };
  setPrice: Dispatch<
    SetStateAction<{
      lessThan: string;
      moreThan: string;
    }>
  >;
  handleSetPrice: (price: { lessThan: string; moreThan: string }) => void;
  handleClearType(): void;
  handleClearBrand(): void;
  handleClearPrice(): void;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  handleSetCategory: (category: string) => void;
  handleClearCategory(): void;
  resetAllFilters: () => void;
  tag: string;
  setTag: Dispatch<SetStateAction<string>>;
  handleSetTag(tag: string): void;
  handleClearTag(): void;
};

export const FiltersContext = createContext<FiltersContextStateType>({
  pagination: {
    page: 0,
    pageSize: 0,
  },
  setPagination: function (): void {},
  type: "",
  setType: function (): void {},
  handleSetType() {},
  handleSetBrand() {},
  brand: "",
  setBrand() {},
  price: {
    lessThan: "0",
    moreThan: "0",
  },
  setPrice() {},
  handleSetPrice() {},
  handleClearBrand() {},
  handleClearType() {},
  handleClearPrice() {},
  category: "",
  setCategory() {},
  handleSetCategory() {},
  handleClearCategory() {},
  resetAllFilters() {},
  handleSetTag() {},
  tag: "",
  setTag() {},
  handleClearTag() {},
});

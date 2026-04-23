import { useState, type PropsWithChildren } from "react";
import { useSearchParams } from "react-router";
import { FiltersContext } from "./FiltersContext";

export const FiltersContextProvider = ({ children }: PropsWithChildren) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    page: +(URLSearchParams.get("page") || "1"),
    pageSize: +(URLSearchParams.get("page-size") || "10"),
  });
  const [type, setType] = useState<string>(URLSearchParams.get("type") || "");
  const [brand, setBrand] = useState<string>(
    URLSearchParams.get("brand") || "",
  );
  const [category, setCategory] = useState<string>(
    URLSearchParams.get("category") || "",
  );
  const [tag, setTag] = useState<string>(URLSearchParams.get("tag") || "");
  const [price, setPrice] = useState<{
    lessThan: string;
    moreThan: string;
  }>({
    lessThan: URLSearchParams.get("less-than") || "",
    moreThan: URLSearchParams.get("more-than") || "",
  });

  const setValueToSearchParam = (name: string, value: string) => {
    URLSearchParams.set(name, value);
    SetURLSearchParams(URLSearchParams);
  };
  const deleteValueFromSearchParam = (name: string) => {
    URLSearchParams.delete(name);
    SetURLSearchParams(URLSearchParams);
  };

  const handleSetType = (type: string) => {
    setType(type);
    setValueToSearchParam("type", type);
  };
  const handleSetTag = (tag: string) => {
    setTag(tag);
    setValueToSearchParam("tag", tag);
  };
  const handleSetBrand = (brand: string) => {
    setBrand(brand);
    setValueToSearchParam("brand", brand);
  };
  const handleSetCategory = (category: string) => {
    setCategory(category);
    setValueToSearchParam("category", category);
  };
  const handleSetPrice = (price: { lessThan: string; moreThan: string }) => {
    setPrice(price);
    setValueToSearchParam("less-than", `${price.lessThan}`);
    setValueToSearchParam("more-than", `${price.moreThan}`);
  };
  const handleClearType = () => {
    setType("");
    deleteValueFromSearchParam("type");
  };
  const handleClearBrand = () => {
    setBrand("");
    deleteValueFromSearchParam("brand");
  };

  const handleClearTag = () => {
    setTag("");
    deleteValueFromSearchParam("tag");
  };
  const handleClearCategory = () => {
    setCategory("");
    deleteValueFromSearchParam("category");
  };
  const handleClearPrice = () => {
    setPrice({ lessThan: "", moreThan: "" });
    deleteValueFromSearchParam("less-than");
    deleteValueFromSearchParam("more-than");
  };
  const resetAllFilters = () => {
    setType("");
    setBrand("");
    setCategory("");
    setTag("");
    setPrice({ lessThan: "", moreThan: "" });
    Array.from(URLSearchParams.keys()).forEach((key) =>
      URLSearchParams.delete(key),
    );
    SetURLSearchParams(URLSearchParams);
  };
  return (
    <FiltersContext
      value={{
        pagination,
        setPagination,
        type,
        setType,
        handleSetType,
        handleSetBrand,
        brand,
        setBrand,
        price,
        handleSetPrice,
        setPrice,
        handleClearBrand,
        handleClearType,
        handleClearPrice,
        category,
        setCategory,
        handleSetCategory,
        handleClearCategory,
        resetAllFilters,
        handleSetTag,
        tag,
        setTag,
        handleClearTag,
      }}
    >
      {children}
    </FiltersContext>
  );
};

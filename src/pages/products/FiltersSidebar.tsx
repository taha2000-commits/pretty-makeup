import { useSearchParams } from "react-router";
import { useResponsive } from "../../hooks/useResponsive";
import { useBrands } from "../../features/brands/useBrands";
import { useProductTypes } from "../../features/product-types/useProductTypes";
import { useFiltersContext } from "../../context/filters-context/useFiltersContext";
import FiltersSidebarSection from "./FiltersSidebarSection";

const FiltersSidebar = () => {
  const [searchParams] = useSearchParams();
  const screenSize = useResponsive();
  const { data: brands } = useBrands();
  const { data: types } = useProductTypes();
  const {
    type,
    handleSetType,
    brand,
    handleSetBrand,
    price,
    handleSetPrice,
    handleClearCategory,
  } = useFiltersContext();

  const areaFromParams = searchParams.get("area");
  const shownTypes = types?.filter(
    (t) => !areaFromParams || t.area === areaFromParams,
  );

  if (screenSize === "xs" || screenSize === "sm") return null;
  return (
    <div className="flex flex-col gap-5 pr-5 pb-10 md:pl-5 lg:pl-10">
      <FiltersSidebarSection
        sectionTitle="product type"
        data={shownTypes || []}
        onClick={(el) => {
          handleSetType(el);
          handleClearCategory();
        }}
        selected={type}
      />
      <FiltersSidebarSection
        sectionTitle="brand"
        data={brands || []}
        onClick={(el) => {
          handleSetBrand(el);
        }}
        selected={brand}
      />
      <FiltersSidebarSection
        sectionTitle="Price"
        data={[
          { name: "5$ - 10$" },
          { name: "10$ - 20$" },
          { name: "20$ - 30$" },
          { name: "30$ - 40$" },
          { name: "more than 40$" },
        ]}
        onClick={(el) => {
          let mt = "";
          let lt = "";
          if (el !== "more than 40$") {
            mt = parseInt(el.split("-")[0]).toString();
            lt = parseInt(el.split("-")[1]).toString();
          } else {
            mt = parseInt(el.split(" ").at(-1) || "")?.toString();
          }
          handleSetPrice({ lessThan: lt, moreThan: mt });
        }}
        selected={`${price.moreThan}$ - ${price.lessThan}$`}
      />
    </div>
  );
};
export default FiltersSidebar;

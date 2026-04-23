import * as Dialog from "@radix-ui/react-dialog";
import { useBrands } from "../../features/brands/useBrands";
import { useProductTypes } from "../../features/product-types/useProductTypes";
import { FiltersTags } from "./FiltersTags";
import { useFiltersContext } from "../../context/filters-context/useFiltersContext";
import { useSearchParams } from "react-router";
import { useResponsive } from "../../hooks/useResponsive";
import FiltersSidebarSection from "./FiltersSidebarSection";
import { getDeviceType } from "../../utils/helpers";
import clsx from "clsx";
import BottomSheet from "../../components/BottomSheet";

export default function FilterBottomSheet({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [searchParams] = useSearchParams();
  const screenSize = useResponsive();
  const {
    handleSetType,
    handleSetBrand,
    handleSetPrice,
    handleClearCategory,
    type,
    brand,
    price,
  } = useFiltersContext();

  const { data: types } = useProductTypes();

  const { data: brands } = useBrands();

  const deviceType = getDeviceType();

  if (screenSize !== "xs" && screenSize !== "sm") return null;

  const areaFromParams = searchParams.get("area");
  const shownTypes = types?.filter(
    (t) => !areaFromParams || t.area === areaFromParams,
  );
  return (
    <BottomSheet open={open} setOpen={setOpen} title="Filters">
      <FiltersTags />
      <div
        className={clsx(
          "scrollbar-4 max-h-[75vh] overflow-y-auto pr-2",
          deviceType == "Mobile" && "scrollbar",
        )}
      >
        <Dialog.Description className="text-sm text-gray-500"></Dialog.Description>
        <FiltersSidebarSection
          sectionTitle="product type"
          data={shownTypes||[]}
          onClick={(el) => {
            handleSetType(el);
            handleClearCategory();
            setOpen(false);
          }}
          selected={type}
        />
        <FiltersSidebarSection
          sectionTitle="brand"
          data={brands||[]}
          onClick={(el) => {
            handleSetBrand(el);
            setOpen(false);
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
            setOpen(false);
          }}
          selected={`${price.moreThan}$ - ${price.lessThan}$`}
        />
      </div>
    </BottomSheet>
  );
}

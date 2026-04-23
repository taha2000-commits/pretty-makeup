import { MdFilterList } from "react-icons/md";
import MakeupCard from "../../components/MakeupCard";
import useProducts from "../../features/products/useProducts";
import { Activity, useState } from "react";
import LoadingScreen from "../loading/LoadingScreen";
import { useFiltersContext } from "../../context/filters-context/useFiltersContext";
import Pagination from "../../components/Pagination";
import { Link, useSearchParams } from "react-router";
import FilterBottomSheet from "./FilterBottomSheet";
import { useResponsive } from "../../hooks/useResponsive";
import { FiltersTags } from "./FiltersTags";
import FiltersSelectsSection from "./FiltersSelectsSection";
import FiltersSidebar from "./FiltersSidebar";
import Button from "../../components/Button";
import AnnouncementBar from "../home/AnnouncementBar";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const screenSize = useResponsive();
  const {
    pagination,
    setPagination,
    type,
    brand,
    price,
    category,
    resetAllFilters,
    tag,
  } = useFiltersContext();

  const { data, products, isLoading, isPlaceholderData } = useProducts({
    params: {
      product_type: type,
      brand: brand,
      product_category: category,
      product_tags: tag,
      price_less_than: price.lessThan,
      price_greater_than: price.moreThan,
    },
    iskeepPreviousData: true,
    pagination,
  });
  const [open, setOpen] = useState(false);

  const areaFromParams = searchParams.get("area");

  return (
    <div>
      <div className="h-50vh bg-[url(/beauty-concept-woman-applying-red-lipstick-with-pink-studio-background-beautiful-girl-makes-makeup.jpg)] bg-cover"></div>
      <AnnouncementBar />
      <div className="p-5 sm:p-10">
        <div className="flex gap-2 text-gray-400 capitalize">
          <Link to={"/"} className="mb-2 hover:text-rose-400 hover:underline">
            Home
          </Link>
          {">"}
          {!areaFromParams ? (
            <Link
              to={"/products"}
              className="hover:text-rose-400 hover:underline"
            >
              products
            </Link>
          ) : (
            <div>{areaFromParams} makeup</div>
          )}
        </div>
        <h1 className="font-sekuya text-xl font-bold capitalize">
          {type || "Makeup"} collection
        </h1>
      </div>
      <div className="grid grid-cols-12 grid-rows-1">
        <div className="scrollbar-4 max-h-120vh hidden overflow-y-scroll md:col-span-3 md:block lg:col-span-3 xl:col-span-2">
          <FiltersSidebar />
        </div>
        <div className="col-span-full row-span-1 flex flex-col px-5 pb-10 sm:px-10 md:col-span-9 lg:col-span-9 xl:col-span-10">
          {isLoading || (isPlaceholderData && !products?.[0]) ? (
            <LoadingScreen />
          ) : (
            <>
              <Activity
                mode={
                  screenSize !== "xs" && screenSize !== "sm"
                    ? "visible"
                    : "hidden"
                }
              >
                <FiltersTags />
              </Activity>

              <FiltersSelectsSection />

              <div className="mb-5 flex justify-end">
                <div
                  className="relative w-fit cursor-pointer rounded-full bg-gray-200 p-3 hover:bg-rose-400 md:hidden"
                  onClick={() => setOpen(true)}
                >
                  <MdFilterList />
                  <div className="absolute -top-1 -left-1 flex aspect-square h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs text-white empty:h-0 empty:w-0">
                    {[
                      type,
                      brand,
                      category,
                      tag,
                      price.lessThan,
                      price.moreThan,
                    ].filter((v): v is string => !!v).length || ""}
                  </div>
                </div>
              </div>
              <div className="min-h-50vh grid w-full flex-1 grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products?.[0] ? (
                  products?.map((product) => (
                    <MakeupCard
                      key={product.id}
                      product={product}
                      isLoading={isPlaceholderData}
                    />
                  ))
                ) : (
                  <div className="col-span-5 flex w-full flex-1 flex-col items-center justify-center gap-5 sm:gap-0">
                    <h2 className="font-playwright text-center text-xl">
                      Oops! No products match your filters.
                    </h2>
                    <Button onClick={resetAllFilters}>reset all filters</Button>
                  </div>
                )}
              </div>
              <div className="mt-10 flex items-center justify-center">
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
                  count={data?.length}
                  disabled={isPlaceholderData}
                />
              </div>
            </>
          )}
        </div>
      </div>{" "}
      <div className="block md:hidden">
        <FilterBottomSheet open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default ProductsPage;

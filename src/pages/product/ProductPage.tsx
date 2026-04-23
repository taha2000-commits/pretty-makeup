import { useLocation, useParams } from "react-router";
import { useProduct } from "../../features/product/useProduct";
import Details from "./components/Details";
import ColorsSection from "./components/ColorsSection";
import clsx from "clsx";
import { ProductPageContextProvider } from "./context/ProductPageContext";
import { useProductPageContext } from "./context/useProductPageContext";
import ProductDraggableRow from "../home/components/ProductDraggableRow";
import useProducts from "../../features/products/useProducts";

const ProductPage = () => {
  const { productID } = useParams();
  const { state } = useLocation();

  if (state)
    return (
      <ProductPageContextProvider product={state}>
        <ProductPageUI />
      </ProductPageContextProvider>
    );
  else return <DataFetch id={productID || ""} />;
};

const DataFetch = ({ id }: { id: string }) => {
  const { data } = useProduct(parseInt(id));
  return (
    <ProductPageContextProvider product={data}>
      <ProductPageUI />
    </ProductPageContextProvider>
  );
};

const ProductPageUI = () => {
  const { product, sectionIndx, setSectionIndx } = useProductPageContext();

  const { data: products } = useProducts({
    params: {
      product_type: product.product_type,
      product_category: product.category,
    },
  });
  return (
    <div className="flex min-h-screen flex-col">
      <div className="min-h-90vh flex relative container mx-auto flex-1">
        <div className="grid min-h-100vh flex-1 w-full bg-white shadow-2xl md:grid-cols-2">
          <div className="row-span-1 flex h-full items-center justify-center p-5">
            <img
              loading="lazy"
              src={product?.api_featured_image}
              alt=""
              className="w-full max-w-sm object-scale-down mix-blend-multiply"
            />
          </div>
          <div className="row-span-1 flex flex-col">
            <div className="flex-1 p-5 sm:p-10">
              <ProductPageUISection />
            </div>
            <div className="flex w-full justify-evenly border-t border-gray-400 p-3 text-gray-400">
              <button
                className={clsx(
                  "cursor-pointer rounded-3xl px-2 capitalize hover:text-gray-700",
                  sectionIndx == 1 && "border-b-4 text-gray-700",
                )}
                onClick={() => setSectionIndx(1)}
              >
                Details
              </button>
              {product?.product_colors?.[4] && (
                <button
                  className={clsx(
                    "cursor-pointer rounded-3xl px-2 capitalize hover:text-gray-700",
                    sectionIndx == 2 && "border-b-4 text-gray-700",
                  )}
                  onClick={() => setSectionIndx(2)}
                >
                  colors
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 pl-5 sm:pl-10 md:pl-20">
        <h3 className="mb-5 text-4xl font-thin capitalize">similar products</h3>
        <ProductDraggableRow products={products || []} />
      </div>
    </div>
  );
};
const ProductPageUISection = () => {
  const { sectionIndx } = useProductPageContext();
  switch (sectionIndx) {
    case 1:
      return <Details />;
    case 2:
      return <ColorsSection />;
    default:
      return <Details />;
  }
};

export default ProductPage;

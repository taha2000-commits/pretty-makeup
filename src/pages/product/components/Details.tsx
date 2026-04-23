import { Link } from "react-router";
import Button from "../../../components/Button";
import QuantitySelect from "../../../components/QuantitySelect";
import clsx from "clsx";
import { useProductPageContext } from "../context/useProductPageContext";
import { useAddToCart } from "../../../features/cart/useAddToCart";
import { generate8DigitNumber } from "../../../utils/helpers";

const Details = () => {
  const {
    product,
    setSectionIndx,
    chosenColor,
    chosenQuantity,
    setChosenColor,
    setChosenQuantity,
  } = useProductPageContext();

  const { mutate: addToCart, isPending: isAdding, isSuccess } = useAddToCart();
  const handleAddToCart = () => {
    addToCart({
      id: generate8DigitNumber(),
      product: product,
      product_id: product.id,
      quantity: chosenQuantity,
      total_price: parseFloat(product.price) * chosenQuantity,
      selected_color: chosenColor,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="text-gray-4 flex w-full gap-1 text-sm font-thin">
        <Link to={``} className="hover:underline">
          Home
        </Link>
        /
        <Link to={``} className="hover:underline">
          {product?.product_type.split("_").join(" ")}
        </Link>
        /
        <Link to={``} className="hover:underline">
          {product?.category}
        </Link>
      </div>
      <div className="text-center">
        <h2 className="text-center text-4xl font-medium">{product?.name}</h2>
        <h5 className="text-gray-400">By: {product?.brand}</h5>
        <div className="mt-5 flex items-center justify-center font-bold">
          <span className="text-xs">{product?.price_sign || "$"}</span>
          <span className="font-sirin text-4xl font-black">
            {product?.price}
          </span>
        </div>
      </div>
      <p className="scrollbar overflow-y-scroll text-center text-sm text-pretty text-gray-400 md:max-h-25">
        {product?.description}
      </p>
      {product?.product_colors?.[0] && (
        <div className="flex flex-col items-center">
          <span className="">choose color</span>
          <div className="flex items-center justify-center gap-1">
            {[...new Set([chosenColor, ...product.product_colors])]
              .slice(0, 4)
              .map((color, i) => (
                <div
                  key={i}
                  className={clsx(
                    `group relative block aspect-square w-7 rounded-xl border-4 border-white shadow-[0px_10px_10px_-5px]`,
                    chosenColor?.hex_value == color?.hex_value &&
                      "translate-y-1 scale-90 border-gray-200! shadow-inner",
                  )}
                  style={{
                    backgroundColor: color.hex_value,
                  }}
                  onClick={() => {
                    setChosenColor(color);
                  }}
                >
                  <div
                    className="absolute left-1/2 z-1 flex aspect-square w-fit origin-center -translate-x-1/2 -translate-y-full scale-0 items-center justify-center rounded-full p-3 text-nowrap text-white opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    style={{
                      backgroundColor: color.hex_value,
                    }}
                  >
                    {color.colour_name}
                  </div>
                </div>
              ))}
            {product.product_colors.length > 4 && (
              <button
                className="cursor-pointer text-gray-400 hover:text-gray-700 hover:underline"
                onClick={() => setSectionIndx(2)}
              >
                show all
              </button>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col items-center">
        <span className="">quantity</span>
        <div className="flex justify-center">
          <QuantitySelect
            chosenQuantity={chosenQuantity}
            setChosenQuantity={setChosenQuantity}
          />
        </div>
      </div>
      <Button
        className={clsx("px-20")}
        onClick={handleAddToCart}
        isLoading={isAdding}
        isSuccess={isSuccess}
      >
        add to cart
      </Button>
    </div>
  );
};
export default Details;

import { useState } from "react";
import { useDeleteFromCart } from "../../../features/cart/useDeleteFromCart";
import { useUpdateCartProduct } from "../../../features/cart/useUpdateCartProduct";
import clsx from "clsx";
import Button from "../../../components/Button";
import { IoIosArrowUp } from "react-icons/io";
import UpdatePanel from "./UpdatePanel";
import type { CartProductType } from "../../../services/supabase/cart/getCart";
import type { Color } from "../../../types/product";

const CartProduct = ({
  product: { product, id, quantity, selected_color, total_price },
}: {
  product: CartProductType;
}) => {
  const {
    mutate: deleteFromCart,
    isPending: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteFromCart();
  const {
    mutate: update,
    isPending: isUpdating,
    isSuccess: isUpdated,
  } = useUpdateCartProduct();

  const [chosenColor, setChosenColor] = useState<Color>(selected_color);

  const [chosenQuantity, setChosenQuantity] = useState<number>(quantity);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isSaveChangesBtnDisabled = selected_color
    ? isOpen &&
      selected_color.colour_name == chosenColor.colour_name &&
      quantity == chosenQuantity
    : isOpen && quantity == chosenQuantity;

  const handleUpdate = () => {
    if (isOpen)
      update(
        {
          cartId: id,
          newColor: chosenColor,
          newQuantity: chosenQuantity,
          total_price: chosenQuantity * parseFloat(product.price),
        },
        {
          onSuccess() {
            setIsOpen(false);
          },
        },
      );
    else setIsOpen(true);
  };

  return (
    <div
      key={id}
      className={clsx(
        "group relative rounded-4xl bg-white p-5 shadow-2xl transition-all duration-700",
        isOpen && "rounded-b-none",
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="xs:w-35 aspect-square overflow-hidden rounded-3xl border-8 border-gray-100 bg-gray-200 sm:w-45 md:w-25">
          <img
            loading="lazy"
            src={product.api_featured_image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-full justify-between capitalize">
          <div className="flex flex-col justify-between gap-3">
            <div className="">
              <h6 className="text-lg font-medium">
                <span>{product.name}</span>
              </h6>
              <p className="text-sm font-thin text-gray-400 italic">
                by: {product.brand}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 text-sm">
              <div className="">
                <span>price:</span>
                <span className="ml-1 font-bold">
                  {(product.price_sign || "$") + product.price}
                </span>
              </div>
              {selected_color && (
                <div className="flex items-center gap-2">
                  <span className="capitalize">
                    color: {selected_color.colour_name}
                  </span>
                  <span
                    className={clsx(
                      `block aspect-square w-7 rounded-xl border-4 border-white shadow-[0px_10px_10px_-5px]`,
                    )}
                    style={{
                      backgroundColor: selected_color.hex_value,
                    }}
                  ></span>
                </div>
              )}
              <p className="">
                <span>qty:</span>
                <span className="ml-1 font-bold">{quantity || 1}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center font-medium">
            <span className="text-md sm:text-xl">total</span>
            <span className="text-sm sm:text-lg">
              {(product.price_sign || "$") + total_price}
            </span>
          </div>
        </div>
      </div>

      <UpdatePanel
        chosenColor={chosenColor}
        setChosenColor={setChosenColor}
        chosenQuantity={chosenQuantity}
        setChosenQuantity={setChosenQuantity}
        selected_color={selected_color}
        product_colors={product.product_colors}
        isOpen={isOpen}
      />

      <div
        className={clsx(
          "absolute right-10 bottom-0 flex translate-y-1/2 items-center gap-2",
          isOpen && "z-2",
        )}
      >
        {isOpen && (
          <Button className="" onClick={() => setIsOpen(false)}>
            <IoIosArrowUp />
          </Button>
        )}
        <Button
          className="text-xs"
          isLoading={isUpdating}
          isSuccess={isUpdated}
          onClick={handleUpdate}
          disabled={isSaveChangesBtnDisabled}
        >
          {isOpen ? "save changes" : "update"}
        </Button>
        <Button
          isLoading={isDeleting}
          isSuccess={isDeleted}
          className="text-xs"
          onClick={() => {
            deleteFromCart(id);
          }}
        >
          remove
        </Button>
      </div>
    </div>
  );
};

export default CartProduct;

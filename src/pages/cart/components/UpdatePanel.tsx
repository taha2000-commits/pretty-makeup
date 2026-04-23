import clsx from "clsx";
import type { Dispatch, SetStateAction } from "react";
import type { Color } from "../../../types/product";
import QuantitySelect from "../../../components/QuantitySelect";

const UpdatePanel = ({
  chosenColor,
  chosenQuantity,
  setChosenColor,
  setChosenQuantity,
  product_colors,
  selected_color,
  isOpen,
}: {
  chosenColor: Color;
  setChosenColor: Dispatch<SetStateAction<Color>>;
  chosenQuantity: number;
  setChosenQuantity: Dispatch<SetStateAction<number>>;
  selected_color: Color;
  product_colors: Color[];
  isOpen: boolean;
}) => {
  return (
    <div
      className={clsx(
        "shadow-3xl absolute top-full right-0 left-0 z-1 origin-top scale-y-0 rounded-b-4xl bg-white p-5 opacity-0 transition-all duration-700",
        isOpen && "scale-y-100 opacity-100",
      )}
    >
      <div className="mt-5">
        <h6 className="mb-2 text-lg font-medium capitalize">change quantity</h6>
        <div className="flex justify-center">
          <QuantitySelect
            chosenQuantity={chosenQuantity}
            setChosenQuantity={setChosenQuantity}
          />
        </div>
      </div>
      {product_colors?.[0] && selected_color && (
        <div className="my-5">
          <h6 className="mb-2 text-lg font-medium capitalize">change color</h6>
          <div className="flex flex-wrap gap-1">
            {product_colors.map((color, i) => (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => {
                  setChosenColor(color);
                }}
              >
                <div
                  className={clsx(
                    "aspect-square w-7 border-4 border-white shadow-[0px_10px_10px_-5px] hover:shadow-inner",
                    chosenColor?.hex_value == color.hex_value &&
                      "translate-y-1 scale-90 border-gray-200! shadow-inner",
                  )}
                  style={{
                    backgroundColor: color.hex_value,
                  }}
                ></div>
              </div>
            ))}
          </div>
          {chosenColor?.hex_value !== selected_color?.hex_value && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="capitalize">
                chosen color: {chosenColor.colour_name}
              </span>
              <span
                className={clsx(
                  `block aspect-square w-7 rounded-xl border-4 border-white shadow-2xs`,
                )}
                style={{
                  backgroundColor: chosenColor.hex_value,
                }}
              ></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdatePanel;

import CustomField from "../../../components/CustomField";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useProductPageContext } from "../context/useProductPageContext";

const ColorsSection = () => {
  const { product, chosenColor, setChosenColor } = useProductPageContext();

  const colors = product?.product_colors || [];

  const { register, watch } = useForm();

  const search = watch("search-colors");

  return (
    <div className="flex h-full gap-5 flex-col">
      <div className="">
        <CustomField
          name="search-colors"
          register={register}
          registerOptions={{}}
          label="search in available colors"
        />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-wrap gap-1">
          {colors
            .filter((color) => color.colour_name.toLowerCase().includes(search))
            .map((color, i) => (
              <div
                key={i}
                className={clsx(
                  `group relative block aspect-square max-h-10 w-10 cursor-pointer rounded-xl border-4 border-white shadow-[0px_10px_10px_-5px] hover:translate-y-1 hover:scale-90 hover:border-gray-200! hover:shadow-inner`,
                  chosenColor?.hex_value == color.hex_value &&
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
        </div>
      </div>
    </div>
  );
};

export default ColorsSection;

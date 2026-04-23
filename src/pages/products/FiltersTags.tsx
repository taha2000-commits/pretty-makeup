import { IoClose } from "react-icons/io5";
import { useFiltersContext } from "../../context/filters-context/useFiltersContext";

export const FiltersTags = () => {
  const {
    brand,
    category,
    handleClearBrand,
    handleClearCategory,
    handleClearPrice,
    handleClearTag,
    handleClearType,
    price,
    tag,
    type,
  } = useFiltersContext();

  return (
    <div className="flex w-fit flex-wrap items-center gap-2 pb-2">
      <FilterTag
        name="type"
        value={type}
        onClose={() => {
          handleClearType();
          handleClearCategory();
        }}
      />
      <FilterTag name="brand" value={brand} onClose={handleClearBrand} />
      <FilterTag
        name="category"
        value={category}
        onClose={handleClearCategory}
      />
      <FilterTag name="tag" value={tag} onClose={handleClearTag} />
      <FilterTag
        name="price"
        value={
          price.lessThan
            ? price.moreThan
              ? `${price.moreThan}$ - ${price.lessThan}$`
              : "less than " + price.lessThan + "$"
            : price.moreThan
              ? "more than " + price.moreThan + "$"
              : ""
        }
        onClose={handleClearPrice}
      />
    </div>
  );
};
const FilterTag = ({
  name,
  value,
  onClose,
}: {
  name: string;
  value: string;
  onClose(): void;
}) => {
  if (value)
    return (
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-5 rounded-full border-2 border-dashed border-rose-400 bg-rose-200 px-2 py-1 text-sm text-rose-400 capitalize">
          <div className="">
            {name}: {value}
          </div>
          <div className="cursor-pointer hover:text-white" onClick={onClose}>
            <IoClose />
          </div>
        </div>
      </div>
    );
};

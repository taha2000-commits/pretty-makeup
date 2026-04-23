import clsx from "clsx";
import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import Button from "../../components/Button";

interface FiltersSidebarSectionProps {
  data: { name: string }[];
  sectionTitle: string;
  selected: string;
  onClick: (el: string) => void;
}

const FiltersSidebarSection = ({
  data,
  sectionTitle,
  onClick,
  selected,
}: FiltersSidebarSectionProps) => {
  const [sliceEnd, setSliceEnd] = useState(5);
  return (
    <div className="">
      <h6 className="mb-4 font-bold capitalize">{sectionTitle}</h6>
      <div className="flex flex-col">
        {data?.slice(0, sliceEnd).map((el, i) => (
          <div
            key={i}
            className={clsx(
              "flex items-center justify-between p-2 hover:bg-rose-400 hover:text-white",
              el.name === selected && "bg-rose-400 text-white",
            )}
            onClick={() => {
              onClick(el.name);
            }}
          >
            <span className="text-sm capitalize">{el.name}</span>
            {el.name === selected && <FaCheckSquare />}
          </div>
        ))}
      </div>
      {data?.length > 5 && (
        <Button
          className="mt-4 w-full"
          onClick={() => {
            setSliceEnd((se) =>
              se < data.length && se > data.length - 5 ? data.length : se + 5,
            );
          }}
        >
          show more
        </Button>
      )}
    </div>
  );
};
export default FiltersSidebarSection;

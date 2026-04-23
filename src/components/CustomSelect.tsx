import { useRef, useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useClickOutside } from "../hooks/useClickOutside";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";

type Option = { name: string; value: string };

const CustomSelect = ({
  options,
  onChange,
  selectedOpt = null,
  title,
  showTitle = true,
  paginated,
  className = "",
}: {
  title?: string;
  showTitle?: boolean;
  paginated?: { numPerPage: number };
  selectedOpt?: Option | null;
  options: Option[];
  onChange: (option: Option, selectedOption: Option | null) => void;
  className?: string;
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selected, setSelected] = useState<Option | null>(selectedOpt);

  const [sliceRange, setSliceRange] = useState<{
    start: number;
    end: number;
  }>({ start: 0, end: paginated?.numPerPage || 5 });

  const ref = useRef(null);
  useClickOutside(ref, () => {
    setMenuVisible(false);
  });

  const shownOptions = options.slice(sliceRange.start, sliceRange.end);

  function nextBtnOnClick() {
    setSliceRange((r) =>
      r.end <= options.length
        ? {
            start: r.start + (paginated?.numPerPage || 5),
            end: r.end + (paginated?.numPerPage || 5),
          }
        : r,
    );
  }

  function prevBtnOnClick() {
    setSliceRange((r) =>
      r.start > 0
        ? {
            start: r.start - (paginated?.numPerPage || 5),
            end: r.end - (paginated?.numPerPage || 5),
          }
        : r,
    );
  }

  return (
    <div className={clsx("relative text-xs sm:min-w-40 sm:text-sm", className)}>
      <div
        className="absolute z-10 h-full w-full cursor-pointer bg-transparent"
        ref={ref}
        onClick={() => {
          setMenuVisible((is) => !is);
        }}
      ></div>
      <div
        className={`border-third flex w-full cursor-pointer items-center justify-between gap-1 border p-2 capitalize transition-all duration-500 ${menuVisible ? "rounded-t-lg" : "rounded-lg"}`}
      >
        {showTitle && <span className="">{title}</span>}
        <span className="">{selected?.name}</span>
        <MdKeyboardArrowDown
          className={`ml-1 transition-all duration-500 ${menuVisible ? "rotate-180" : "rotate-0"}`}
          size={16}
        />
      </div>
      <div
        className={`absolute top-full right-0 z-50 min-w-full origin-top overflow-hidden rounded-b-xl border bg-white transition-all duration-500 ${menuVisible ? "translate-y-0 scale-y-100 opacity-100" : "translate-y-2 scale-y-0 opacity-0"}`}
      >
        <div className="flex flex-col">
          {shownOptions.map((opt, i) => (
            <div
              key={i}
              className={`flex cursor-pointer items-center justify-between px-2 py-2 whitespace-nowrap capitalize not-last:border-b hover:bg-gray-100 ${selected?.name == opt.name && "pointer-events-none bg-gray-100"}`}
              onClick={() => {
                setSelected(opt);
                onChange(opt, selected);
                setMenuVisible(false);
              }}
              onBlur={() => {
                setMenuVisible(false);
              }}
            >
              {opt.name} {selected?.name == opt.name && <FaCheck size={10} />}
            </div>
          ))}
          {paginated ? (
            <div
              className={`flex cursor-pointer items-center justify-between px-2 py-2 capitalize not-last:border-b hover:bg-gray-100`}
              onClick={() => setMenuVisible(true)}
            >
              <div
                className={`border px-1 disabled:border-gray-200 disabled:text-gray-200`}
                onClick={() => {
                  prevBtnOnClick();
                }}
              >
                <MdKeyboardArrowLeft size={14} />
              </div>
              <button
                className={`cursor-pointer border px-1 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-200`}
                onClick={() => {
                  nextBtnOnClick();
                }}
                disabled={sliceRange.end > options.length}
              >
                <MdKeyboardArrowRight size={14} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;

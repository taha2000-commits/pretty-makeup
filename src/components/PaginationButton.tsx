import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PaginationButton = ({
  type,
  onClick,
  disabled = false,
}: {
  type: "previous" | "next";
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`border-third hover:border-fourth hover:text-fourth col-span-1 flex ${type == "next" && "justify-end"} cursor-pointer rounded-lg border p-2 ${disabled && "pointer-events-none"}`}
      onClick={onClick}
    >
      {type == "previous" ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
    </div>
  );
};

export default PaginationButton;

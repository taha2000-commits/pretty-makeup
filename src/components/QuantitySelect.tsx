import type { Dispatch, SetStateAction } from "react";

const QuantitySelect = ({
  chosenQuantity,
  setChosenQuantity,
}: {
  chosenQuantity: number;
  setChosenQuantity: Dispatch<SetStateAction<number>>;
}) => {
  const handleIncQuantity = () => setChosenQuantity((q) => (q += 1));
  const handleDecQuantity = () => setChosenQuantity((q) => (q > 1 ? q - 1 : q));
  return (
    <div className="grid w-30 grid-cols-4 select-none">
      <div
        className="col-span-1 flex cursor-pointer items-center justify-center rounded-md bg-rose-400 text-white hover:bg-gray-200 hover:text-black"
        onClick={handleDecQuantity}
      >
        -
      </div>
      <div className="col-span-2">
        <input
          value={chosenQuantity}
          type="text"
          className="w-full border-none text-center outline-none"
          onChange={(e) => {
            setTimeout(() => {
              setChosenQuantity(parseInt(e.target.value));
            }, 200);
          }}
        />
      </div>
      <div
        className="col-span-1 flex cursor-pointer items-center justify-center rounded-md bg-rose-400 text-white hover:bg-gray-200 hover:text-black"
        onClick={handleIncQuantity}
      >
        +
      </div>
    </div>
  );
};

export default QuantitySelect;

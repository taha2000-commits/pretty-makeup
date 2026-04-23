import clsx from "clsx";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { PuffLoader } from "react-spinners";
import { useSuccessDelay } from "../hooks/useSuccessDelay";
import { FaCheck } from "react-icons/fa";

const Button = ({
  isLoading = false,
  onClick = () => {},
  className = "",
  children,
  disabled = false,
  type,
  isSuccess = false,
}: {
  onClick?: () => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  disabled?: boolean;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
} & PropsWithChildren) => {
  const { isSuccessDuration } = useSuccessDelay(isSuccess, isLoading);

  return (
    <button
      className={clsx(
        "flex cursor-pointer items-center justify-center gap-1 rounded-full bg-rose-400 p-4 py-1 text-white capitalize shadow-2xl transition-all duration-300 hover:bg-rose-300 disabled:cursor-not-allowed disabled:bg-gray-300",
        className,
      )}
      disabled={disabled || isLoading || isSuccessDuration}
      onClick={onClick}
      type={type}
    >
      {children}
      {isSuccessDuration ? (
        <FaCheck size={16} color="#ffffff" />
      ) : (
        <PuffLoader color="#ffffff" loading={isLoading} size={12} />
      )}
    </button>
  );
};

export default Button;

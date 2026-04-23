import clsx from "clsx";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type HTMLInputTypeAttribute,
  type RefObject,
} from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const CustomField = <T extends FieldValues>({
  register,
  error,
  name,
  label,
  registerOptions,
  type,
  placeholder,
  disabled = false,
  isAnimateLabel = true,
  showLabel = true,
  className = "",
  defaultValue = "",
}: {
  type?: HTMLInputTypeAttribute;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  showLabel?: boolean;
  isAnimateLabel?: boolean;
  error?: FieldError;
  register: UseFormRegister<T>;
  registerOptions: RegisterOptions<T, Path<T>> | undefined;
  className?: string;
  defaultValue?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowHide = () => setShowPassword((show) => !show);

  const labelAnimation = {
    from: {
      top: "-4px",
      color: "rgba(0,0,0,1)",
    },
    to: {
      top: "50%",
      color: "rgba(0,0,0,0.5)",
    },
  };
  const labelRef = useRef(null) as RefObject<HTMLLabelElement | null>;
  const animateLabel = ({
    label,
    type,
  }: {
    label: HTMLLabelElement | undefined;
    type: "to" | "from";
  }) => {
    if (label && isAnimateLabel) {
      label.style.top = labelAnimation[type]["top"];
      label.style.color = labelAnimation[type]["color"];
    }
  };

  const effEvent = useEffectEvent(() => {
    if (defaultValue)
      animateLabel({ label: labelRef.current || undefined, type: "from" });
  });
  useEffect(() => {
    effEvent();
  }, []);

  return (
    <div className="w-full text-sm sm:text-inherit">
      <div className="relative flex w-full">
        <input
          id={name}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            "w-full border-b border-b-black/30 bg-transparent p-2 outline-none",
            error && "border-b-red-400",
            className,
          )}
          onFocus={(e) => {
            animateLabel({
              label: e.target.labels?.[0],
              type: "from",
            });
          }}
          {...register(name, registerOptions)}
          onBlur={(e) => {
            if (e.target.value == "")
              animateLabel({
                label: e.target.labels?.[0],
                type: "to",
              });
          }}
        />

        {showLabel && (
          <label
            ref={labelRef}
            htmlFor={name}
            className={clsx(
              "absolute top-1/2 left-2 -translate-y-1/2 text-black/20 capitalize transition-all duration-300",
            )}
          >
            {label}
          </label>
        )}
        <div className="absolute top-1/2 right-2 -translate-y-1/2 text-red-500">
          {error?.type == "required" ? (
            "*"
          ) : type == "password" ? (
            !showPassword ? (
              <LuEyeClosed
                className="cursor-pointer text-black hover:text-gray-600"
                onClick={handleShowHide}
              />
            ) : (
              <LuEye
                className="cursor-pointer text-black hover:text-gray-600"
                onClick={handleShowHide}
              />
            )
          ) : null}
        </div>
      </div>
      {error?.message && error.type !== "required" && (
        <p className="mt-1 text-xs text-red-500">{error?.message}</p>
      )}
    </div>
  );
};

export default CustomField;

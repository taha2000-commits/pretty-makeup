import { useEffect, useState } from "react";

const getScreenSize = (innerWidth: number) => {
  if (innerWidth < 640) return "xs";
  if (innerWidth < 768) return "sm";
  if (innerWidth < 1024) return "md";
  if (innerWidth >= 1024) return "lg";
  return "lg";
};

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState("");

  useEffect(() => {
    const check = () => {
      setScreenSize(getScreenSize(window.innerWidth));
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return screenSize;
};

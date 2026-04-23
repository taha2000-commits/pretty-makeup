import { useEffect, useEffectEvent, useRef, type RefObject } from "react";

export function useClickOutside(
  elementRef: RefObject<Element | null>,
  callback: () => void,
) {
  const callbackRef = useRef<() => void>(null);
  const handleClickOutside = useEffectEvent((e: MouseEvent) => {
    if (
      !elementRef?.current?.contains(e.target as Element) &&
      callbackRef.current
    ) {
      callbackRef.current();
    }
  });

  useEffect(() => {
    callbackRef.current = callback;
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [callback, callbackRef, elementRef]);
}

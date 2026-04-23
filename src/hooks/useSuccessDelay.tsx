import { useEffect, useEffectEvent, useState } from "react";

export const useSuccessDelay = (
  isSuccess: boolean,
  isLoading: boolean,
  duration = 800,
) => {
  const [isSuccessDuration, setIsSuccessDuration] = useState(true);

  const event = useEffectEvent(() => {
    if (isSuccess && !isLoading)
      setTimeout(() => {
        setIsSuccessDuration(false);
      }, duration);
    else setIsSuccessDuration(true);
  });
  useEffect(event, [event]);
  return {
    isSuccessDuration: isSuccessDuration && isSuccess,
  };
};

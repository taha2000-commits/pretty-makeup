export function generate8DigitNumber() {
  return Math.floor(10000000 + Math.random() * 90000000);
}
export const removeEmptyValues = (object = {}) =>
  Object.fromEntries(Object.entries(object).filter(([, v]) => v !== ""));

export const prepareParams = (object: Record<string, string | number> = {}) => {
  return Object.fromEntries(
    Object.entries(object)
      .filter(([, v]) => v !== "")
      .map(([k, v]) => {
        return [k, typeof v == "string" ? v.split(" ").join("_") : v];
      }),
  );
};
export const getDeviceType: () => "Desktop" | "Mobile" = () => {
  const ua = navigator.userAgent;

  if (/android/i.test(ua) || /iPhone|iPad|iPod/i.test(ua)) return "Mobile";
  return "Desktop";
};

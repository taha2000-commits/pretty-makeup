import api from "../api";

export const getProduct = async (id: number) => {
  const { data } = await api.get(`/products/${id}.json`);
  return data;
};

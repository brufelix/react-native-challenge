import { ENDPOINTS } from "@/constants/Endpoints";
import { api } from "@/services/api";
import { Product } from "@/types/product";

export const getProductQuery = async (): Promise<Product[]> => {
  const { data } = await api.get(ENDPOINTS.products);

  return data;
}

export const queryKeys = {
  list: "get-products"
}
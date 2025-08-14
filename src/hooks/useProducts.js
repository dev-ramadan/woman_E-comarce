// hooks/useProducts.js

import { useGetProductsQuery } from "../ReduxTollkit/productsApi";

export const useProducts = () => {
  const { data: products = [], error, isLoading } = useGetProductsQuery();

  // get trending
  const trending = products.filter((product) => product.is_trending === true);

  return {
    products,
    trending,
    error,
    isLoading
  };
};

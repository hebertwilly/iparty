import { useEffect, useState } from "react";

import {
  getProductsByCompany,
  toggleProductStatus,
} from "../services/products/productService";

export function useProducts(companyId) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");

  const loadProducts = async () => {
    try {
      setProductsError("");
      setLoadingProducts(true);

      const data = await getProductsByCompany(companyId);

      setProducts(data);
    } catch (error) {
      console.error(error);
      setProductsError("Não foi possível carregar os produtos e serviços.");
    } finally {
      setLoadingProducts(false);
    }
  };

  const changeProductStatus = async (productId, isActive) => {
    await toggleProductStatus(productId, isActive);
    await loadProducts();
  };

  useEffect(() => {
    if (!companyId) {
      setLoadingProducts(false);
      return;
    }

    loadProducts();
  }, [companyId]);

  return {
    products,
    loadingProducts,
    productsError,
    refreshProducts: loadProducts,
    changeProductStatus,
  };
}
import { Route, Routes } from "react-router-dom";

import { ProductsLayout } from "../pages/products";
import { ProductDetailsLayout } from "../pages/productDetails";
import { CartLayout } from "../pages/cart";

import { ROUTE_NAMES } from "./routeNames";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.PRODUCTS_ALL} element={<ProductsLayout />} />
      <Route path={ROUTE_NAMES.PRODUCTS} element={<ProductsLayout />} />
      <Route
        path={ROUTE_NAMES.PRODUCT_DETAILS}
        element={<ProductDetailsLayout />}
      />
      <Route path={ROUTE_NAMES.CART} element={<CartLayout />} />
    </Routes>
  );
};

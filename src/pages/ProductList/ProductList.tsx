import { useQuery } from "@tanstack/react-query";
import React from "react";
import { productApi } from "../../apis/product.api";
import useQueryParams from "../../hooks/useQueryParams";
import AsideFilter from "./AsideFilter";
import ProductItem from "./ProductItem";
import SortProductList from "./SortProductList";

interface ProductListProps {}

const ProductList = ({}: ProductListProps) => {
  const queryParams = useQueryParams();
  const { data } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => {
      return productApi.getProductList(queryParams);
    },
  });
  console.log("🚀 ~ data:", data);

  return (
    <div className="bg-gray-200 px-12 py-3">
      <div className="grid grid-cols-12 gap-x-2">
        <div className="col-span-2">
          <AsideFilter />
        </div>
        <div className="col-span-10  p-2">
          <SortProductList />
          <div className="grid mt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
            <div className="col-span-1 bg-white">
              <ProductItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { omitBy, isUndefined } from "lodash";

import { productApi } from "../../apis/product.api";
import Pagination from "../../components/Paginate";
import useQueryParams from "../../hooks/useQueryParams";
import { ProductListConfig } from "../../types/product.type";
import AsideFilter from "./AsideFilter";
import ProductItem from "./ProductItem";
import SortProductList from "./SortProductList";

interface ProductListProps {}

export type QueryConfig = {
  [key in keyof ProductListConfig]: string;
};

const ProductList = ({}: ProductListProps) => {
  const queryParams: QueryConfig = useQueryParams();

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || "1",
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name,
      category: queryParams.category,
    },
    isUndefined
  );

  const { data } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig);
    },
    keepPreviousData: true,
  });

  return (
    <div className="bg-gray-200 px-12 py-3">
      <div className="grid grid-cols-12 gap-x-2">
        <div className="col-span-2">
          <AsideFilter />
        </div>
        <div className="col-span-10  p-2">
          {data && (
            <SortProductList
              queryConfig={queryConfig}
              pageSize={data.data.data.pagination.page_size}
            />
          )}
          <div className="grid mt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {data?.data.data.products.map((product) => (
              <div className="col-span-1 bg-white">
                <ProductItem product={product} />
              </div>
            ))}
          </div>
          {data && (
            <Pagination
              queryConfig={queryConfig}
              pageSize={data.data.data.pagination.page_size}
            ></Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

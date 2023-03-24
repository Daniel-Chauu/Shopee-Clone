import classNames from "classnames";
import { omit } from "lodash";
import React from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import path from "../../../constant/path";
import { order as orderConstant } from "../../../constant/product";
import { ProductListConfig } from "../../../types/product.type";
import { QueryConfig } from "../ProductList";

interface SortProductListProps {
  queryConfig: QueryConfig;
  pageSize: number;
}

const SortProductList = ({ queryConfig, pageSize }: SortProductListProps) => {
  const navigate = useNavigate();
  const page = Number(queryConfig.page);
  const { sort_by = "createdAt", order } = queryConfig;

  const isActive = (
    sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
  ) => {
    return sortByValue === sort_by;
  };

  const handleSort = (
    sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
  ) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...omit(queryConfig, "order"),
        sort_by: sortByValue,
      }).toString(),
    });
  };

  const handleSortByPrice = (
    sortByValue: Exclude<ProductListConfig["order"], undefined>
  ) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: "price",
        order: sortByValue,
      }).toString(),
    });
  };

  return (
    <>
      <div className="bg-gray-300/40 py-4 px-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-2">
            <div>Sắp xếp theo</div>
            <button
              className={classNames("h-8 px-4 capitalize text-sm text-center", {
                "bg-orange hover:bg-orange/80 text-white":
                  isActive("createdAt"),
                "bg-white hover:bg-slate-100 text-black":
                  !isActive("createdAt"),
              })}
              onClick={() => handleSort("createdAt")}
            >
              Mới nhất
            </button>
            <button
              className={classNames("h-8 px-4 capitalize text-sm text-center", {
                "bg-orange hover:bg-orange/80 text-white": isActive("view"),
                "bg-white hover:bg-slate-100 text-black": !isActive("view"),
              })}
              onClick={() => handleSort("view")}
            >
              Phổ biến
            </button>
            <button
              className={classNames("h-8 px-4 capitalize text-sm text-center", {
                "bg-orange hover:bg-orange/80 text-white": isActive("sold"),
                "bg-white hover:bg-slate-100 text-black": !isActive("sold"),
              })}
              onClick={() => handleSort("sold")}
            >
              Bán chạy
            </button>
            <select
              className={classNames(
                "h-8 px-4 capitalize text-black text-sm text-left outline-none",
                {
                  "bg-orange hover:bg-orange/80 text-white": isActive("price"),
                  "bg-white hover:bg-slate-100 text-black": !isActive("price"),
                }
              )}
              value={order || ""}
              onChange={(e) =>
                handleSortByPrice(
                  e.target.value as Exclude<
                    ProductListConfig["order"],
                    undefined
                  >
                )
              }
            >
              <option className="bg-white text-black" value="" disabled>
                Giá
              </option>
              <option className="bg-white text-black" value={orderConstant.asc}>
                Giá: Thấp đến cao
              </option>
              <option
                className="bg-white text-black
              "
                value={orderConstant.desc}
              >
                Giá: Cao đến thấp
              </option>
            </select>
          </div>

          <div className="flex items-center">
            <div>
              <span className="text-orange">{page}</span>
              <span>/{pageSize}</span>
            </div>
            <div className="ml-2 flex items-center">
              {page === 1 ? (
                <span className="px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </span>
              ) : (
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      page: (page - 1).toString(),
                    }).toString(),
                  }}
                  className="px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100  shadow flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </Link>
              )}
              {page === pageSize ? (
                <span className="px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              ) : (
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      page: (page + 1).toString(),
                    }).toString(),
                  }}
                  className="px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100  shadow flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SortProductList;

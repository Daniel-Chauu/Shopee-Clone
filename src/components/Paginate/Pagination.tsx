import classNames from "classnames";
import React from "react";
import { createSearchParams, Link } from "react-router-dom";
import path from "../../constant/path";
import { QueryConfig } from "../../pages/ProductList/ProductList";
import Button from "../Button";
// import {} from "classnames"

interface PaginationProps {
  queryConfig: QueryConfig;
  pageSize: number;
}

const RANGE = 2;

const Pagination = ({ queryConfig, pageSize }: PaginationProps) => {
  const page = Number(queryConfig.page);

  const renderPaginate = () => {
    let dotBefore = false;
    let dotAfter = false;
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span className="mx-2 py-2 px-4 " key={index}>
            ...
          </span>
        );
      }
      return null;
    };
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span className="mx-2 py-2 px-4 " key={index}>
            ...
          </span>
        );
      }
      return null;
    };
    return (
      <>
        {Array(pageSize)
          .fill(0)
          .map((_, index) => {
            const pageNumber = index + 1;

            if (
              page <= RANGE * 2 + 1 &&
              pageNumber > page + RANGE &&
              pageNumber < pageSize - RANGE + 1
            ) {
              return renderDotBefore(index);
            } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
              if (pageNumber < page - RANGE && pageNumber > RANGE) {
                return renderDotBefore(index);
              } else if (
                pageNumber > page + RANGE &&
                pageNumber < pageSize - RANGE + 1
              ) {
                return renderDotAfter(index);
              }
            } else if (
              page >= pageSize - RANGE * 2 &&
              pageNumber > RANGE &&
              pageNumber < page - RANGE
            ) {
              return renderDotBefore(index);
            }
            return (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: pageNumber.toString(),
                  }).toString(),
                }}
                className={classNames("mx-2 py-2 px-4 inline-block", {
                  "bg-orange rounded-md": pageNumber === page,
                })}
                key={index}
              >
                {pageNumber}
              </Link>
            );
          })}
      </>
    );
  };

  return (
    <div className="flex items-center justify-center mt-5  w-full">
      <div className="flex items-center gap-x-2">
        {page === 1 ? (
          <span className="p-2 border cursor-not-allowed opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
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
            className="p-2 border "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
        )}
        {renderPaginate()}
        {/* <Button className="p-2 border " hover="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button> */}
        {page === pageSize ? (
          <span className="p-2 border cursor-not-allowed opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
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
            className="p-2 border "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
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
  );
};

export default Pagination;

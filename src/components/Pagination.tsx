import {  type Dispatch, type SetStateAction } from "react";
import { useSearchParams } from "react-router";
import PaginationButton from "./PaginationButton";

const Pagination = ({
  pagination,
  setPagination,
  count = 0,
  disabled = false,
}: {
  pagination: {
    page: number;
    pageSize: number;
  };
  setPagination: Dispatch<
    SetStateAction<{
      page: number;
      pageSize: number;
    }>
  >;
  count?: number;
  disabled?: boolean;
}) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();

  const numOfPages = count > 0 ? Math.ceil(count / pagination.pageSize) : 0;

  const handleToPrev = () => {
    if (pagination.page > 1) {
      setPagination((p) => {
        return { ...p, page: p.page - 1 };
      });
      URLSearchParams.set("page", `${pagination.page - 1}`);
      SetURLSearchParams(URLSearchParams);
    }
  };

  const handleToNext = () => {
    if (pagination.page < numOfPages) {
      setPagination((p) => {
        return { ...p, page: p.page + 1 };
      });
      URLSearchParams.set("page", `${pagination.page + 1}`);
      SetURLSearchParams(URLSearchParams);
    }
  };

  const isHasPrevious = pagination.page > 1;
  const activePage = +(URLSearchParams.get("page") || "1") || pagination.page;
  const isHasNext = activePage < numOfPages;
  
  if ([0, 1].includes(numOfPages)) return;
  return (
    <div className="grid w-fit grid-cols-3 justify-center gap-2">
      {isHasPrevious ? (
        <PaginationButton
          type="previous"
          onClick={handleToPrev}
          disabled={disabled}
        />
      ) : (
        <div className="col-span-1"></div>
      )}

      <div className="col-span-1 flex items-center justify-center gap-1">
        {activePage}
        <span className="text-xs text-rose-400">from</span>
        {numOfPages}
      </div>
      {isHasNext ? (
        <PaginationButton
          type="next"
          onClick={handleToNext}
          disabled={disabled}
        />
      ) : (
        <div className="col-span-1"></div>
      )}
    </div>
  );
};

export default Pagination;

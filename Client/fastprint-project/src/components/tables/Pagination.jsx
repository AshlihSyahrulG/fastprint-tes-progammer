import React from 'react';
import { usePagination, DOTS } from './usePagination';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {     
  // const {
  //   onPageChange,
  //   totalCount,
  //   siblingCount = 1,
  //   currentPage,
  //   pageSize,
  // } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className="flex items-center gap-2">
      <span>Page</span>
      <input
        type="text"
        className="px-2 py-1 h-8 w-8 text-center rounded-md border-2 border-primary-400"
        value={'1'}
      />
      <span>of 10</span>
      <div className="flex gap-2">
        <div
          className="px-2 py-1 text-center cursor-pointer rounded-md border-2 border-primary-400 h-8 w-8 flex items-center"
          onClick={onPrevious}
        >
          <HiOutlineChevronLeft className=" " />
        </div>

        {paginationRange?.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <div className="pagination-item dots" key={pageNumber}>
                &#8230;
              </div>
            );
          }

          return (
            <div
              key={pageNumber}
              className={`px-1 py-1 cursor-pointer text-center rounded-md border-2 border-primary-400 h-8 min-w-[32px] max-w[40px] flex justify-center items-center ${
                pageNumber === currentPage ? 'bg-primary-500' : ''
              }`}
            >
              <span
                className={` truncate text-ellipsis ${
                  pageNumber === currentPage ? 'text-white' : ''
                }`}
              >
                {pageNumber}
              </span>
            </div>
          );
        })}

        <div
          className="px-2 py-1 cursor-pointer text-center rounded-md border-2 border-primary-400 h-8 w-8 flex items-center"
          onClick={onNext}
        >
          <HiOutlineChevronRight className=" " />
        </div>
      </div>
    </div>
  );
};

export default Pagination;

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Pagination = ({ url, currentPage, totalPage, updateCurrentPage, updateSearchParamsPage }) => {
  const updatePage = (page) => {
    return updateSearchParamsPage(page);
  };

  const changePage = (number) => {
    if (number == "prev") {
      return updatePage(currentPage - 1);
    } else if (number == "next") {
      return updatePage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="join mt-2">
        <button
          disabled={currentPage <= 1 ? true : false}
          className="join-item btn btn-md"
          onClick={(e) => {
            e.preventDefault();
            return changePage("prev");
          }}
        >
          «
        </button>
        <button className="join-item btn btn-md">{`Page ${currentPage}`}</button>
        <button
          disabled={totalPage == currentPage ? true : false}
          className="join-item btn btn-md"
          onClick={(e) => {
            e.preventDefault();
            return changePage("next");
          }}
        >
          »
        </button>
      </div>
    </>
  );
};

export default Pagination;

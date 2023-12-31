import React from "react";
import { Pagination } from "react-bootstrap";

function CustomPagination(props) {
  const { currentPage, totalPages, onPageChange } = props;

  const renderPageItems = () => {
    const pageItems = [];

    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pageItems;
  };

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        {renderPageItems()}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
}

export default CustomPagination;

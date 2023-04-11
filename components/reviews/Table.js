import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import { Review } from './Review';
import usePagination from './Pagination';
import TableHeader from './TableHeader';

const Table = ({ reviews }) => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const count = Math.ceil(reviews.length / PER_PAGE);
  const reviewData = usePagination(reviews, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    reviewData.jump(p);
  };
  return (
    <div className="my-4 w-full flex-col items-center p-4 mx-auto">
      <div className="grid justify-end">
        <TableHeader />
      </div>
      <div className="">
        {reviewData.currentData().map((review, i) => (
          <Review review={review} key={i} />
        ))}
      </div>
      <div className="mt-2 p-2 grid justify-items-end text-white">
        <Pagination
          count={count}
          page={page}
          variant="round"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Table;

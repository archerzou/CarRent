import React from 'react';
import { Rating } from '@mui/material';

export const Review = ({ review }) => {
  const { name, image } = review.reviewBy;
  return (
    <div className="py-2 grid grid-cols-3 gap-8 items-center">
      {/* review left part */}
      <div className="flex items-start mb-4 space-x-4">
        <img className="-10 h-10 rounded-full" src={image} alt="" />
        <div className="space-y-1 font-medium ">
          <p>{name.slice(0, 1)}***{name.slice(name.length - 1, name.length)}</p>
          {/* review content */}
          <div className="py-2">
            <Rating
              name="half-rating-read"
              value={review.rating}
              precision={0.5}
              readOnly
            />
          </div>
          <p className="pb-2 text-gray-500">{review.review}</p>
        </div>
      </div>
      {/* review middle part */}
      <div className="grid grid-cols-3 gap-2">
        {review.images.length > 0
            && review.images.map((img, i) => <img key={i} className="h-auto max-w-full rounded-lg hover:scale-125 ease-in duration-500" src={img?.url} alt="" />)}
      </div>
      <div className="grid justify-end">
        {review?.updatedAt?.slice(0, 10)}
      </div>
    </div>
  );
};

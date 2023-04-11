import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Rating } from '@mui/material';

import AddReview from './AddReview';
import Table from './Table';

const Reviews = ({ car }) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(car.reviews);

  return (
    <div className="mt-8 max-w-6xl bg-white rounded-md p-6 shadow-lg text-left mx-auto">
      <h1 className="font-bold text-2xl">Customer Reviews  (0)</h1>
      <div className="grid grid-cols-2 px-6 items-center">
        <div>
          <p className="text-sm font-medium text-gray-500 py-4">Average Rating</p>
          <div className="flex flex-wrap">
            <Rating
              defaultValue={car.rating}
              precision={0.5}
              readOnly
            />
            {car.rating === 0 ? 'No review yet.' : car.rating}
          </div>
        </div>
        {/* rating bar */}
        <div className="flex-col ml-2">
          {car.ratings.map((rating, i) => (
            <div key={i} className="flex items-center gap-3">
              <Rating
                defaultValue={5 - i}
                readOnly
              />
              <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded my-1.5 ">
                <div
                  className="h-5 bg-yellow-400 rounded"
                  style={{ width: `${rating.percentage}%` }}
                />
              </div>
              <span className="pl-2 text-sm font-medium text-blue-500">{rating.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
      {session ? (
        <AddReview car={car} setReviews={setReviews} />
      ) : (
        <button
          type="button"
          className="mt-4 mx-auto w-full bg-blue-500 py-2.5 px-5 rounded text-white font-semibold"
          onClick={() => signIn()}
        >
          Login to add review
        </button>
      )}
      <Table reviews={reviews} />
    </div>
  );
};

export default Reviews;

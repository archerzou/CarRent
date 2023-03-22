import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaGasPump } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';
import { BsFillPeopleFill } from 'react-icons/bs';

const CarCard = ({ car }) => {
  const { title, carType, images, gasoline, steering, capacity, price } = car;

  return (
    <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow sm:p-6 p-4 ">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-900 font-bold sm:text-xl text-base">
            {title}
          </p>
          <p className="text-gray-400 font-bold sm:text-sm text-xs">
            {carType}
          </p>
        </div>
        <AiFillHeart className="p-0.5 sm:w-6 sm:h-6 w-3.5 h-3.5 text-gray-400" />
      </div>
      <div className="flex-col">
        <img className="py-6 rounded-lg" src={images[0].url} alt="car" />
        <div className="flex justify-between">
          <div className="flex gap-1.5 items-center text-gray-500">
            <FaGasPump className="sm:w-5 w-3.5 " />
            <p className=" sm:text-sm text-xs leading-4 font-medium">
              {gasoline}L
            </p>
          </div>
          <div className="flex gap-1.5 items-center text-gray-500">
            <GiSteeringWheel className="sm:w-5 w-3.5" />
            <p className=" sm:text-sm text-xs leading-4 font-medium">
              {steering}
            </p>
          </div>
          <div className="flex gap-1.5 items-center text-gray-500">
            <BsFillPeopleFill className="sm:w-5 w-3.5" />
            <p className=" sm:text-sm text-xs leading-4 font-medium">
              {capacity} People
            </p>
          </div>
        </div>
        <div className="flex pt-6 justify-between items-center">
          <p className="text-gray-900 font-bold sm:text-xl">
            ${price}/
            <span className="text-gray-400 sm:text-sm text-x">
              day
            </span>
          </p>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Rent Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default CarCard;

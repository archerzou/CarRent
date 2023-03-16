import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaGasPump } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';
import { BsFillPeopleFill } from 'react-icons/bs';

// exmaple data
const car = {
  name: 'Koenigsegg',
  category: 'Sport',
  image: '/car/png',
  gas: '90L',
  type: 'Manual',
  people: 2,
  price: '99.00', // maybe change to number
};

const CarCard = () => {
  const { name, category, image, gas, type, people, price } = car;

  return (
    <div className="ss:min-w-[304px] min-w-[327px] flex flex-col sm:gap-y-6 gap-y-2 justify-between sm:p-6 p-4 bg-white rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-900 font-bold sm:text-xl text-base leading-6">
            {name}
          </p>
          <p className="text-gray-400 font-bold sm:text-sm text-xs leading-4">
            {category}
          </p>
        </div>
        <AiFillHeart className="p-0.5 sm:w-5 sm:h-5 w-3.5 h-3.5 text-red-700" />
      </div>
      <div className="flex sm:flex-col justify-between sm: flex-start">
        <div>
          <img className="py-7 sm:w-[248px] w-[160px]" src="./car.png" alt="car" />
          <div className="relative mb-[-56px] bottom-[70px] bg-gradient-to-b from-transparent to-white-0 h-14" />
        </div>
        <div className="flex sm:justify-between justify-start gap-y-2 flex-col sm:flex-row ">
          <div className="flex gap-1.5 items-center">
            <FaGasPump className="sm:w-5 w-3.5" />
            <p className="text-gray-400 sm:text-sm text-xs leading-4 font-medium">
              {gas}
            </p>
          </div>
          <div className="flex gap-1.5 items-center">
            <GiSteeringWheel className="sm:w-5 w-3.5" />
            <p className="text-gray-400 sm:text-sm text-xs leading-4 font-medium">
              {type}
            </p>
          </div>
          <div className="flex gap-1.5 items-center">
            <BsFillPeopleFill className="sm:w-5 w-3.5" />
            <p className="text-gray-400 sm:text-sm text-xs leading-4 font-medium">
              {people} People
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-900 font-bold sm:text-xl  leading-6">
          ${price}/
          <span className="text-gray-400 sm:text-sm text-xs leading-4">
            day
          </span>
        </p>
        {/* // TODO: later we can change this to a link */}
        <button
          type="button"
          className="button sm:w-[116px] w-[100px] bg-blue-500 py-2.5 px-5 rounded text-white font-semibold sm:text text-xs leading-5"
        >
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;

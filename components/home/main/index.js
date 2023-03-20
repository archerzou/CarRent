import React from 'react';
import Link from 'next/link';
import SearchBar from '../../searchBar';
import PickUp from '../../pickUp';
import CarCard from '../../carCard';

const Main = ({ searchHandler }) => {
  console.log('homepage');
  return (
    <div className=" bg-gray-100  sm:px-16 px-6">
      <SearchBar searchHandler={searchHandler} />
      {/* hero section */}
      <div className="flex flex-col justify-between">
        {/* left card */}
        <div className="grid grid-cols-1 gap-8 items-center sm:grid-cols-2">
          <div className="min-w-sm p-6 bg-blue-300 border border-gray-200 rounded-lg shadow">
            <div className="max-w-[284px]">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-white ">The Best Platform for Car Rental</h5>
              <p className="mb-3 font-normal text-white ">Ease of doing a car rental safely and reliably. Of course at a low price..</p>
            </div>

            <a href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Rental Car
            </a>
            <img className="w-3/4 mx-auto" src="/carleft.png" alt="car_left" />
          </div>
          {/* right card */}
          <div className="hidden sm:block min-w-sm p-6 bg-blue-500 border border-gray-200 rounded-lg shadow">
            <div className="max-w-[284px]">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-white ">Easy way to rent a car at a low price</h5>
              <p className="mb-3 font-normal text-white ">Providing cheap car rental services and safe and comfortable facilities.</p>
            </div>
            <a href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-300 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Rental Car
            </a>
            <img className="w-2/3 mx-auto" src="/carright.png" alt="car_right" />
          </div>
        </div>
      </div>
      {/* renting section */}
      <PickUp />
      {/* Popular car */}
      <div className="flex-col">
        <div className="w-full flex py-8 justify-between items-center">
          <span className="font-bold text-md text-gray-500">Popular Car</span>
          <Link href="/">
            <span className="font-bold text-md text-blue-500">View All</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-center">
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
        </div>

      </div>
      {/* Recomendation car */}
      <div className="flex-col">
        <div className="w-full flex py-8 justify-start items-center">
          <span className="font-bold text-md text-gray-500">Recomendation</span>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-center">
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
        </div>

      </div>

      <div className="flex justify-center py-8">
        <button type="button" className="bg-blue-500 py-2.5 px-5 rounded text-white">
          Show more car
        </button>
      </div>
    </div>
  );
};

export default Main;

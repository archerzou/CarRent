import React from 'react';
import SearchBar from './SearchBar';

const Main = ({ searchHandler }) => {
  console.log('homepage');
  return (
    <div className=" min-h-screen bg-gray-100">
      <div className="container min-h-screen bg-red-500 mx-2 sm:mx-20">
        <SearchBar searchHandler={searchHandler} />
        <div className="flex flex-col items-center justify-center py-8">
          {/* left card */}
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="min-w-sm p-6 bg-blue-300 border border-gray-200 rounded-lg shadow">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">Noteworthy technology acquisitions 2021</h5>
              <p className="mb-3 font-normal text-white ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <a href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
              </a>
              <img className="w-3/4 mx-auto" src="/carleft.png" alt="car_left" />
            </div>
            {/* right card */}
            <div className="min-w-sm p-6 bg-blue-500 border border-gray-200 rounded-lg shadow">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">Noteworthy technology acquisitions 2021</h5>
              <p className="mb-3 font-normal text-white ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <a href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
              </a>
              <img className="w-2/3 mx-auto" src="/carright.png" alt="car_right" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Main;

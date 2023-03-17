import React from 'react';

import CustomInput from '../customInput';

const CarInfo = () => {
  console.log('carinfo');
  return (
    <div className="flex flex-col items-center justify-center bg-gray_2 py-6 sm:p-6 mx-auto">
      <div className="w-full bg-white rounded-lg shadow my-8 sm:max-w-6xl xl:p-0">
        <div className="p-4">
          <p className=" font-semibold leading-tight tracking-tight text-gray-900 sm:text-lg ">
            Add a Car for Rent
          </p>
          <p className="text-sm leading-tight tracking-tight text-gray-300 ">
            Please enter your car info
          </p>
          <p className="text-sm font-semibold leading-tight tracking-tight text-blue-700 pt-8 py-4">
            CAR INFO
          </p>
          {/* car info first line */}
          <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Car Title</label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Your car"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Car Brand</label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Brand name"
              />
            </div>
          </div>
          {/*  car info second line */}
          <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Rent Price</label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Price in dollors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Capacity</label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Capacity in persons"
              />
            </div>
          </div>
          {/*  car info third line */}
          <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Car Type</label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Car Type"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Location</label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Select your city"
              />
            </div>
          </div>

          <p className="text-sm font-semibold leading-tight tracking-tight text-blue-700 pt-8 py-4">
            PICK INFO
          </p>
          {/* pick info first line */}
          <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Car Title</label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Your car"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Car Brand</label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Brand name"
              />
            </div>
          </div>
          {/*  pick info second line */}
          <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Rent Price</label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Price in dollors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Capacity</label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Capacity in persons"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CarInfo;

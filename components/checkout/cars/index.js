import React from 'react';
import dateFormat from 'dateformat';
import { FaStaylinked } from 'react-icons/fa';

import { calculateDays } from '../../../utils/calculateDays';

const Cars = ({ cart }) => (
  <div className="flex flex-col items-center justify-center bg-gray_2  mx-auto">
    <div className="w-full bg-white rounded-lg shadow my-8 sm:max-w-6xl xl:p-0">
      <div className="p-4">
        <div className="flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold leading-tight tracking-tight text-gray-900 sm:text-2xl py-2 ">Rental Cars</p>
            <span className="text-blue-600 font-bold sm:text-xl py-2">
              Total Fee: USD {cart.cartTotal}$
            </span>
          </div>

        </div>
        <div>
          <div className="flex-col">
            {cart.cars.map((car) => (
              <div className="grid grid-cols-2 items-start">
                <img src={car.image} alt="" className="h-auto max-w-full rounded-lg mt-6" />
                <div className="flex-col justify-start p-6">
                  <p className="text-xl font-bold text-gray-900 py-2">{car.title}</p>
                  <p className="text-xl font-bold text-gray-900 py-2">
                    ${car.price * calculateDays(car.startDate, car.endDate)}
                  </p>
                  <p className="text-xl font-bold text-gray-500 py-2">Pick up: {car.pickLocation}</p>
                  <p className="text-xl font-bold text-gray-500 py-2">Drop off: {car.dropLocation}</p>
                  <p className="text-xl font-bold text-gray-500 py-2">Rent From: {dateFormat(car.startDate, 'yyyy-mm-dd')}</p>
                  <p className="text-xl font-bold text-gray-500 py-2">Rent To: {dateFormat(car.endDate, 'yyyy-mm-dd')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Cars;

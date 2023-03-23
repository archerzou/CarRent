import React from 'react';

const CapacityFilter = ({ capacities, capacityHandler, replaceQuery }) => (
  <div className="flex-col justify-start mx-auto">
    {capacities.map((capacity, i) => {
      const check = replaceQuery('capacity', capacity);
      return (
        <div
          key={i}
          className="flex items-center mb-4"
        >
          <input
            id={capacity}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            onClick={() => capacityHandler(check.result)}
          />
          <label htmlFor={capacity} className="ml-3 font-blod text-gray-900">{capacity} Person</label>
        </div>
      );
    })}
  </div>
);

export default CapacityFilter;

import React from 'react';

const CarTypeFilter = ({ carTypes, carTypeHandler, replaceQuery }) => (
  <div className="flex-col justify-start mx-auto">
    {carTypes?.map((carType, i) => {
      const check = replaceQuery('carType', carType);
      return (
        <div
          key={i}
          className="flex items-center mb-4"
        >
          <input
            id={carType}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            onChange={() => carTypeHandler(check.result)}
          />
          <label htmlFor={carType} className="ml-3 font-blod text-gray-900">{carType}</label>
        </div>
      );
    })}
  </div>
);

export default CarTypeFilter;

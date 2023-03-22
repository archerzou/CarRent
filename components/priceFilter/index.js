import React, { useState } from 'react';

const PriceFilter = (min, max) => {
  const [selectPrice, setSelectPrice] = useState(100);
  const changePrice = (event) => {
    setSelectPrice(event.target.value);
  };
  return (
    <div>
      <input
        id="minmax-range"
        type="range"
        min="50"
        max="150"
        value={selectPrice}
        onChange={changePrice}
        className="w-full h-4 rounded-lg cursor-pointer "
      />
      <div className="flex justify-between py-4">
        <label htmlFor="minmax-range" className="block mb-2 text-sm font-medium text-gray-900 ">{selectPrice} </label>
      </div>

    </div>
  );
};

export default PriceFilter;

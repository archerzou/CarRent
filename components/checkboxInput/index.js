import React, { useState } from 'react';

const CheckboxInput = ({ item }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex items-center mb-4">
      <input id={item} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
      <label htmlFor={item} className="ml-3 font-blod text-gray-900">{item}</label>
    </div>
  );
};

export default CheckboxInput;

import { useState, useEffect } from 'react';
import { compareArrays } from '../../../utils/arrays_utils';

const CartHeader = ({ cartItems, selected, setSelected }) => {
  const [active, setActive] = useState();

  useEffect(() => {
    const check = compareArrays(cartItems, selected);
    setActive(check);
  }, [selected]);

  const handleSelect = () => {
    if (selected.length !== cartItems.length) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  };

  return (
    <div className="flex-col shadow-md px-20">
      <h1 className="mb-4 text-center text-2xl font-bold ">Cars in Cart ({cartItems.length})</h1>
      <div className="flex items-center mx-6">
        <div
          className={`w-6 h-6 m-4 border-2 border-gray-400 hover:border-blue-600 rounded ${active ? 'bg-blue-600' : ''}`}
          onClick={() => handleSelect()}
        />
        <span>Select all items</span>
      </div>
    </div>
  );
};

export default CartHeader;

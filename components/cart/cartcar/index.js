import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';

import Pickup from '../pickup';
import { updateCart } from '../../../store/cartSlice';
import { calculateDays } from '../../../utils/calculateDays';

const CartCar = ({ car, selected, setSelected, locations }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [active, setActive] = useState();
  useEffect(() => {
    const check = selected.find((p) => p._id === car._id);
    setActive(check);
  }, [selected]);

  const rentDays = calculateDays(car.startDate, car.endDate);

  const handleSelect = () => {
    if (active) {
      setSelected(selected.filter((p) => p._id !== car._id));
    } else {
      setSelected([...selected, car]);
    }
  };

  const removeCar = (id) => {
    const newCart = cart.cartItems.filter((p) => p._id !== id);
    dispatch(updateCart(newCart));
  };

  return (
    <div className="grid grid-cols-3 rounded-lg bg-white shadow-md items-center">
      <div className="grid items-center mx-6">
        <div
          className={`w-6 h-6 border-2 border-gray-400 hover:border-blue-600 rounded ${active ? 'bg-blue-600' : ''}`}
          onClick={() => handleSelect()}
        />
        <div className="flex-col m-6">
          <img
            src={car.images[0].url}
            alt=""
            className="h-auto max-w-full rounded-lg mt-6"
          />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between items-center">
            <div className="mt-5 sm:mt-2">
              <p className="text-lg font-bold text-gray-900">{car.title}</p>
              <span>{car.brand}</span>
            </div>
            <p className="text-lg font-bold text-gray-900 mx-6 mt-5 sm:mt-2">
              ${car.price}/
              <span className="text-gray-400 sm:text-sm text-x">
                day
              </span>
            </p>
          </div>
        </div>
      </div>

      <Pickup car={car} drop={car.dropLocation} start={Date.parse(car.startDate)} end={Date.parse(car.endDate)} locations={locations} />
      <div className="grid justify-center">
        <p className="mx-auto text-lg font-bold text-blue-600 items-end">Rental Fee</p>
        <p className="mx-auto text-lg font-bold text-gray-900 items-end">USD {(car.price * rentDays).toFixed(2)}$</p>
        <div
          className="z-10"
          onClick={() => removeCar(car._id)}
        >
          <RiDeleteBin6Line
            className="mx-auto w-10 h-10 text-gray-500 items-end mt-10 cursor-pointer"
          />
        </div>

      </div>
    </div>

  );
};

export default CartCar;


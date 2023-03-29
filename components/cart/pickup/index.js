import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import DialogModal from '../../dialogModal';
import { addToCart } from '../../../store/cartSlice';
import { hideDialog, showDialog } from '../../../store/DialogSlice';
import { locationOptions } from '../../../constants';

const Pickup = ({ car }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dropLocation, setDropLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { cart } = useSelector((state) => ({ ...state }));
  const pickLocation = car.location;

  useEffect(() => {
    dispatch(hideDialog());
  }, []);

  const startChange = (newDate) => {
    setStartDate(newDate);
  };

  const endChange = (newDate) => {
    setEndDate(newDate);
  };

  const onDropChange = (e) => {
    e.preventDefault();
    setDropLocation(e.target.value);
  };

  const addToCartHandler = async () => {
    const today = new Date();
    if (car.renting) {
      setError(
        'This car is under renting by other people.',
      );
      return;
    }
    if (startDate < today) {
      setError(
        'Please select a date not earlier than today.',
      );
    } else if (endDate <= startDate) {
      setError(
        'Please select drop off date later than pick up date.',
      );
    }
    dispatch(
      addToCart({
        ...car,
        pickLocation,
        dropLocation,
        startDate,
        endDate,
      }),
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow my-12 mx-auto sm:max-w-3xl xl:p-0">
      <div className="p-4">
        <p className=" font-semibold leading-tight tracking-tight text-gray-900 sm:text-lg ">
          Add Pickup & Dropoff Location
        </p>
        <p className="text-sm leading-tight tracking-tight text-gray-300 ">
          Please enter your location info
        </p>
        <p className="text-sm font-semibold leading-tight tracking-tight text-blue-700 pt-8 py-4">
          PICKUP INFO
        </p>
        <form
          onSubmit={() => {
            addToCartHandler();
          }}
        >

          {/* car info first line */}
          <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-6">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Pickup Location</label>
              <input
                type="text"
                name="title"
                value={pickLocation}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 ">Drop Off Location</label>
              <select
                id="sorting"
                name="sorting"
                onChange={onDropChange}
                defaultValue="Select drop city"
                className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              >
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.display}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/*  car info second line */}
          <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
            <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Availability From</label>
              <DatePicker
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                selected={startDate}
                placeholder="Select pick up date"
                onChange={startChange}
              />
            </div>
            <div>
              <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900 ">Availability To</label>
              <DatePicker
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                selected={endDate}
                placeholder="Select drop off date"
                onChange={endChange}
              />
            </div>
          </div>
          <div className="flex justify-end my-4">
            <button
              type="submit"
              className="mr-0 text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add to Cart
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Pickup;

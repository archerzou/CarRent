import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const locationOptions = [
  { value: 'Chichago', display: 'Chichago' },
  { value: 'Sealte', display: 'Sealte' },
  { value: 'New York', display: 'New York' },
  { value: 'Houston', display: 'Houston' },
  { value: 'Dallas', display: 'Dallas' },
];

const timeOptions = [
  { value: '9:00 am', display: '9:00 am' },
  { value: '12:00 am', display: '12:00 am' },
  { value: '15:00 pm', display: '15:00 pm' },
  { value: '18:00 pm', display: '18:00 pm' },
  { value: '21:00 pm', display: '21:00 pm' },
];

const PickUp = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pickLocation, setPicklLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [pickTime, setPickTime] = useState('');
  const [dropTime, setDropTime] = useState('');

  const startChange = (newDate) => {
    setStartDate(newDate);
    console.log('startDate:', newDate);
  };

  const endChange = (newDate) => {
    setEndDate(newDate);
    console.log('endDate:', newDate);
  };

  const onPickChange = (e) => {
    e.preventDefault();
    const newPickLocation = e.target.value;
    setPicklLocation(newPickLocation);
    console.log('select location:', newPickLocation);
  };

  const onDropChange = (e) => {
    e.preventDefault();
    const newDropLocation = e.target.value;
    setDropLocation(newDropLocation);
    console.log('select location:', newDropLocation);
  };

  const onPickTime = (e) => {
    e.preventDefault();
    const newPickTime = e.target.value;
    setPickTime(newPickTime);
    console.log('select pick time:', newPickTime);
  };

  const onDropTime = (e) => {
    e.preventDefault();
    const newDropTime = e.target.value;
    setDropTime(newDropTime);
    console.log('select Drop time:', newDropTime);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-7 sm:gap-8 items-center py-4">
      {/* pick up card */}
      <div className="col-span-3 p-4 bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex-col justify-start">
          <div className="flex justify-start items-center p-1.5">
            <img className="w-4 h-4 border-2 rounded-full border-spacing-4" src="./ellipseleft.png" alt="ellipseleft" />
            <p className="text-md mx-2">Pick - Up</p>
          </div>

          <div className="grid grid-cols-3 justify-center items-center py-1.5">
            {/* select location */}
            <div className="flex-col justify-start">
              <p htmlFor="location" className="font-bold">
                Locations
              </p>
              <select
                id="sorting"
                name="sorting"
                onChange={onPickChange}
                defaultValue="Select your city"
                className=" text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
              >
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.display}
                  </option>
                ))}
              </select>
            </div>
            {/* select date */}
            <div className="flex-col justify-start">
              <p className="font-bold">Date</p>
              <DatePicker
                className="p-1 text-gray-500"
                selected={startDate}
                placeholder="Select your date"
                onChange={startChange}
              />
            </div>
            {/* select time */}
            <div className="flex-col justify-start">
              <p className="font-bold">Time</p>
              <select
                id="time"
                name="timeselect"
                defaultValue="Select your time"
                onChange={onPickTime}
                className=" text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
              >
                {timeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.display}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className="col-span-1 bg-blue-500 w-16 h-16 mx-auto rounded-lg shadow">
        <img src="/arrow.png" className="text-white p-4" alt="arrow" />
      </button>
      {/* drop off card */}
      <div className="col-span-3 p-4 bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex-col justify-start">
          <div className="flex justify-start items-center p-1.5">
            <img className="w-4 h-4 border-2 rounded-full border-spacing-4" src="./ellipseleft.png" alt="ellipseleft" />
            <p className="text-md mx-2">Drop - Off</p>
          </div>

          <div className="grid grid-cols-3 justify-center items-center p-1.5">
            {/* select drop location */}
            <div className="flex-col justify-start sm:pr-8 ">
              <p htmlFor="location" className="font-bold">
                Locations
              </p>
              <select
                id="sorting"
                name="sorting"
                onChange={onDropChange}
                defaultValue="Select your city"
                className=" text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
              >
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.display}
                  </option>
                ))}
              </select>
            </div>
            {/* select date */}
            <div className="flex-col justify-start sm:pr-4 ">
              <p className="font-bold">Date</p>
              <DatePicker
                className="p-1 text-gray-500"
                selected={endDate}
                placeholder="Select your date"
                onChange={endChange}
              />
            </div>
            {/* select time */}
            <div className="flex-col justify-start">
              <p className="font-bold">Time</p>
              <select
                id="time"
                name="timeselect"
                defaultValue="Select your time"
                onChange={onDropTime}
                className=" text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
              >
                {timeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.display}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickUp;

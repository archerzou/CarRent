import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import CustomInput from '../../customInput';

const initialState = {
  pickLocation: '',
  dropLocation: '',
  startDate: '',
  endDate: '',
};

const Pickup = () => {
  const handleChange = (e) => {
    const { value, name } = e.target;
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
        <Formik
          enableReinitialize
          initialValues={initialState}
          validationSchema
          onSubmit={() => {}}
        >
          {() => (
            <Form>
              {/* car info first line */}
              <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-6">
                <div>
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Pickup Location</label>
                  <CustomInput
                    type="text"
                    name="title"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="Your car"
                  />
                </div>
                <div>
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 ">Drop Off Location</label>
                  <CustomInput
                    type="text"
                    name="brand"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="Brand name"
                  />
                </div>
              </div>
              {/*  car info second line */}
              <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
                <div>
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Availability From</label>
                  <CustomInput
                    type="number"
                    name="price"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="Price in dollors"
                  />
                </div>
                <div>
                  <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900 ">Availability To</label>
                  <CustomInput
                    type="text"
                    name="capacity"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="Capacity in persons"
                  />
                </div>
              </div>
              <div className="flex justify-end my-4">
                <button type="submit" className="mr-0 text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save to Cart</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Pickup;

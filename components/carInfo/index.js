import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomInput from '../customInput';
import CustomTextArea from '../customTextArea';

const initialState = {
  title: '',
  brand: '',
  description: '',
  price: 0,
  capacity: 0,
  carType: '',
  location: '',
  images: [],
};

const CarInfo = () => {
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(initialState);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCar({ ...car, [name]: value });
  };

  const validate = Yup.object({
    title: Yup.string().required('Please add a title'),
    brand: Yup.string().required('Please add a brand'),
    description: Yup.string().required('Please add a description'),
    price: Yup.number().required('Please add a price number'),
    capacity: Yup.number().required('Please add a capacity  number'),
    carType: Yup.string().required('Please select a car type.'),
    location: Yup.string().required('Please select your location.'),
  });

  const createCarHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/admin/car', car);
      setLoading(false);
      toast.success(data.message, {
        hideProgressBar: true, autoClose: 3000, type: 'success',
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        hideProgressBar: true, autoClose: 3000, type: 'error',
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray_2 py-6 sm:p-6 mx-auto">
        <div className="w-full bg-white rounded-lg shadow my-8 sm:max-w-6xl xl:p-0">
          <div className="p-4">
            <p className=" font-semibold leading-tight tracking-tight text-gray-900 sm:text-lg ">
              Add a Car for Rent
            </p>
            <p className="text-sm leading-tight tracking-tight text-gray-300 ">
              Please enter your car info
            </p>
            <p className="text-sm font-semibold leading-tight tracking-tight text-blue-700 pt-8 py-4">
              CAR INFO
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                title: car.title,
                description: car.description,
                brand: car.brand,
                price: car.price,
                capacity: car.capacity,
                carType: car.carType,
                location: car.location,
              }}
              validationSchema={validate}
              onSubmit={() => {
                createCarHandler();
              }}
            >
              {() => (
                <Form>
                  {/* car info first line */}
                  <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
                    <div>
                      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Car Title</label>
                      <CustomInput
                        type="text"
                        name="title"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        placeholder="Your car"
                      />
                    </div>
                    <div>
                      <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 ">Car Brand</label>
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
                      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Rent Price</label>
                      <CustomInput
                        type="number"
                        name="price"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        placeholder="Price in dollors"
                      />
                    </div>
                    <div>
                      <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900 ">Capacity</label>
                      <CustomInput
                        type="number"
                        name="capacity"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        placeholder="Capacity in persons"
                      />
                    </div>
                  </div>
                  {/*  car info third line */}
                  <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
                    <div>
                      <label htmlFor="carType" className="block mb-2 text-sm font-medium text-gray-900 ">Car Type</label>
                      <CustomInput
                        type="text"
                        name="carType"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        placeholder="Car Type"
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 ">Location</label>
                      <CustomInput
                        type="text"
                        name="location"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        placeholder="Select your city"
                      />
                    </div>
                  </div>
                  {/* car infor fourth line */}
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 py-4 ">Car description</label>
                  <CustomTextArea
                    name="description"
                    rows="4"
                    onChange={handleChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="Descripe car here..."
                  />

                  <p className="text-sm font-semibold leading-tight tracking-tight text-blue-700 pt-8 py-4">
                    PICK INFO
                  </p>
                  {/* pick info first line */}
                  <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Pickup Location</label>
                      <input
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        placeholder="Location Address"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Drop Off Location</label>
                      <input
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        placeholder="Location Address"
                      />
                    </div>
                  </div>
                  {/*  pick info second line */}
                  <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Availability From</label>
                      <input
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        placeholder="From date"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Availability to</label>
                      <input
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        placeholder="To date"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end my-4">
                    <button type="submit" className="mr-0 text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Rent now</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CarInfo;

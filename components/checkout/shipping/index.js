import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import {
  changeActiveAddress,
  deleteAddress,
  saveAddress,
} from '../../../requests/user';
import CustomInput from '../../customInput';

const initialValues = {
  clientName: '',
  phoneNumber: '',
  city: '',
  address: '',
};

const Shipping = ({ user, addresses, setAddresses }) => {
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(!user?.address.length);
  const {
    clientName,
    phoneNumber,
    city,
    address,
  } = shipping;

  const validate = Yup.object({
    clientName: Yup.string()
      .required('Name is required.')
      .min(3, 'Name must be atleast 3 characters long.')
      .max(20, 'Name must be less than 20 characters long.'),
    phoneNumber: Yup.string()
      .required('Phone number is required.')
      .min(3, 'Phone number must be atleast 3 characters long.')
      .max(30, 'Phone number must be less than 20 characters long.'),
    city: Yup.string()
      .required('City name is required.')
      .min(2, 'City name should contain 2-60 characters.')
      .max(60, 'City name should contain 2-60 characters.'),
    address: Yup.string()
      .required('Address is required.')
      .min(5, 'Address should contain 5-100 characters.')
      .max(100, 'Address should contain 5-100 characters.'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const saveShippingHandler = async () => {
    console.log('first');
    const res = await saveAddress(shipping);
    console.log('address', res);
    setAddresses(res.addresses);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow my-8 sm:max-w-6xl xl:p-0">
        <div className="p-4">
          <p className="font-semibold leading-tight tracking-tight text-gray-900 sm:text-2xl py-3 ">
            Shipping Information
          </p>
          <Formik
            enableReinitialize
            initialValues={{
              clientName,
              phoneNumber,
              city,
              address,
            }}
            validationSchema={validate}
            onSubmit={() => {
              saveShippingHandler();
            }}
          >
            {() => (
              <Form>
                <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
                  <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
                    <CustomInput
                      name="clientName"
                      placeholder="Name"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Phone number</label>
                    <CustomInput
                      name="phoneNumber"
                      placeholder="Phone number"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>

                </div>
                <div className=" grid grid-cols-1 gap-8 items-center sm:grid-cols-2 py-4">
                  <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">City</label>
                    <CustomInput
                      name="city"
                      placeholder="City"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                    <CustomInput
                      name="address"
                      placeholder="Address"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                </div>
                <div className="flex justify-end my-4">
                  <button type="submit" className="mr-0 text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save address</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Shipping;

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DotLoaderSpinner from '../../components/loaders/dotLoader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import CustomInput from '../../components/customInput';

const forgot = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');

  const emailValidation = Yup.object({
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password.",
      )
      .email('Enter a valid email address.'),
  });

  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/forgot', {
        email,
      });
      setError('');
      setSuccess(data.message);
      setLoading(false);
      setEmail('');
    } catch (err) {
      setLoading(false);
      setSuccess('');
      setError(err.response.data.message);
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header />
      <div className="flex flex-col items-center justify-center bg-gray_2 p-6 sm:p-32 mx-auto">
        <div className="flex items-center">
          <button type="button" className="flex p-2.5 text-lg border-2 hover:border-primary rounded-full">
            <BiLeftArrowAlt className="text-sm sm:text-2xl hover:text-primary" />
          </button>
          <span className="text-sm sm:text-2xl ml-4">
            Forget your password ! <Link href="/" className="text-primary underline underline-offset-8">Login instead</Link>
          </span>
        </div>

        {/* change the password  */}
        <div className="w-full bg-white rounded-lg shadow my-8 sm:max-w-md xl:p-0">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl ">
              Change Password
            </h1>
            <Formik
              enableReinitialize
              initialValues={{
                email,
              }}
              validationSchema={emailValidation}
              onSubmit={() => {
                forgotHandler();
              }}
            >
              {() => (
                <Form className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                    <CustomInput
                      type="text"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                      placeholder="Email Address"
                    />
                  </div>
                  <button type="submit" className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send Link</button>
                </Form>
              )}
            </Formik>
            <div className="mt-3">
              {error && <span className="text-red-700">{error}</span>}
              {success && <span className="text-green-700">{success}</span>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default forgot;

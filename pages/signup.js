import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { signIn } from 'next-auth/react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import CustomInput from '../components/customInput';
import DotLoaderSpinner from '../components/loaders/dotLoader';

const initialvalues = {
  name: '',
  email: '',
  password: '',
  confPassword: '',
  success: '',
  error: '',
  loginError: '',
};

const signup = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  const { name, email, password, confPassword, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object({
    name: Yup.string()
      .required('What is your name ?')
      .min(2, 'First name must be between 2 and 16 characters.')
      .max(16, 'First name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]/, 'Numbers and special characters are not allowed.'),
    email: Yup.string()
      .required(
        'You need this when you log in and if you ever need to reset your password.',
      )
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).',
      )
      .min(6, 'Password must be atleast 6 characters.')
      .max(36, 'Password can not be more than 36 characters'),
    confPassword: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
      setUser({ ...user, error: '', success: data.message });
      setLoading(false);
      setTimeout(async () => {
        const options = {
          redirect: false,
          email,
          password,
        };
        const res = await signIn('credentials', options);
        Router.push('/');
      }, 2000);
    } catch (err) {
      setLoading(false);
      setUser({ ...user, success: '', error: err.response.data.message });
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header />
      <div className="flex flex-col items-center justify-center bg-gray_2 p-6 mx-auto">
        <div className="flex items-center">
          <button type="button" className="flex p-2.5 text-lg border-2 hover:border-primary rounded-full">
            <BiLeftArrowAlt className="text-sm sm:text-2xl hover:text-primary" />
          </button>
          <span className="text-sm sm:text-2xl ml-4">
            We'd be happy to join us ! <Link href="/" className="text-primary underline underline-offset-8">Go Renting</Link>
          </span>
        </div>
        {/* register section */}
        <div className="w-full bg-white rounded-lg shadow my-8 sm:max-w-md xl:p-0">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl ">
              Create and account
            </h1>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                confPassword,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {() => (
                <Form className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
                    <CustomInput
                      type="text"
                      name="name"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                      placeholder="full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                    <CustomInput
                      type="email"
                      name="email"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <CustomInput
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label htmlFor="confpassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                    <CustomInput
                      type="password"
                      name="confPassword"
                      placeholder="••••••••"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <button type="submit" className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                  <p className="text-sm font-light text-gray-500">
                    Already have an account? <a href="/signin" className="font-medium text-primary hover:underline">Login here</a>
                  </p>
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className="text-green-700">{success}</span>}
            </div>
            <div>{error && <span className="text-red-700">{error}</span>}</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default signup;

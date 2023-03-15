import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { getSession, signIn } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import DotLoaderSpinner from '../../../components/loaders/dotLoader';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import CustomInput from '../../../components/customInput';

export default function reset({ userId }) {
  console.log('user_id', userId);
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required('Please enter your new password.')
      .min(6, 'Password must be atleast 6 characters.')
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });

  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put('/api/auth/reset', {
        userId,
        password,
      });
      const options = {
        redirect: false,
        email: data.email,
        password,
      };
      await signIn('credentials', options);
      window.location.reload(true);
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
            Reset your password ? <Link href="/" className="text-primary underline underline-offset-8">Login instead</Link>
          </span>
        </div>

        {/* reset password */}
        <div className="w-full bg-white rounded-lg shadow my-8 sm:max-w-md xl:p-0">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl ">
              Change Password
            </h1>
            <Formik
              enableReinitialize
              initialValues={{
                password,
                confPassword,
              }}
              validationSchema={passwordValidation}
              onSubmit={() => {
                resetHandler();
              }}
            >
              {() => (
                <Form className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <CustomInput
                      type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
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
                      onChange={(e) => setConfPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <button type="submit" className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset password</button>
                </Form>
              )}
            </Formik>
            <div className="mt-3">
              {error && <span className="text-red-700">{error}</span>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
  const { token } = query;

  const userId = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
  if (userId == null) {
    console.log('adoajdàihjadiohiodhjioadha');
  }
  console.log(userId);
  return {
    props: {
      userId: userId.id,
    },
  };
}


import React, { useState } from 'react';
import Link from 'next/link';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  getProviders,
  getCsrfToken,
  getSession,
  signIn,
} from 'next-auth/react';
import Router from 'next/router';
import Header from '../components/header';
import Footer from '../components/footer';
import CustomInput from '../components/customInput';
import DotLoaderSpinner from '../components/loaders/dotLoader';

const signin = ({ providers, callbackUrl, csrfToken }) => {
  console.log(providers);
  const initialvalues = {
    loginEmail: '',
    loginPassword: '',
    loginError: '',
  };
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  const { loginEmail, loginPassword, loginError } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    loginEmail: Yup.string()
      .required('Email address is required.')
      .email('Please enter a valid email address.'),
    loginPassword: Yup.string().required('Please enter a password'),
  });

  const signInHandler = async () => {
    setLoading(true);
    const options = {
      redirect: false,
      email: loginEmail,
      password: loginPassword,
    };
    const res = await signIn('credentials', options);
    setUser({ ...user, success: '', error: '' });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, loginError: res?.error });
    } else {
      return Router.push(callbackUrl || '/');
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
        <div className="mx-0 sm:mx-16">
          {/* login section */}
          <div className="flex-col">

            <div className="w-full bg-white rounded-lg shadow my-8 sm:max-w-md xl:p-0 ">
              {/* other providers */}
              <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2 px-3 py-3 ">
                {providers.map((provider) => {
                  if (provider.name === 'Credentials') {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-start mb-3 text-black bg-gray-100 rounded-lg text-sm px-2.5 py-2.5 text-center hover:bg-gray-200"
                        onClick={() => signIn(provider.id)}
                      >
                        <img
                          src={`../../icons/${provider.name}.png`}
                          className="w-6 h-6 mr-1"
                          alt=""
                        />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 gap-2 items-center px-5">
                <hr className="border-black border-1" />
                <span className="text-sm text-center">Or With</span>
                <hr className="border-black border-1" />
              </div>
              <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl ">
                  Sign in to your account
                </h1>
                <Formik
                  enableReinitialize
                  initialValues={{
                    loginEmail,
                    loginPassword,
                  }}
                  validationSchema={loginValidation}
                  onSubmit={() => {
                    signInHandler();
                  }}
                >
                  {() => (
                    <Form
                      method="post"
                      className="space-y-4 md:space-y-6"
                      action="/api/auth/signin/email"
                    >
                      <input
                        type="hidden"
                        name="csrfToken"
                        defaultValue={csrfToken}
                      />
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <CustomInput
                          type="text"
                          name="loginEmail"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5"
                          placeholder="Email Address"
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <CustomInput
                          type="password"
                          name="loginPassword"
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 " required="" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500">Remember me</label>
                          </div>
                        </div>
                        <a href="/auth/forgot" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                      </div>
                      <button type="submit" className="w-full text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                      {loginError && (
                        <span className="text-red-700">{loginError}</span>
                      )}
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="/signup" className="font-medium text-primary hover:underline ">Sign up</a>
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default signin;

export async function getServerSideProps(context) {
  const { req, query } = context;

  const session = await getSession({ req });
  const { callbackUrl } = query;

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: {
      providers,
      csrfToken,
      callbackUrl,
    },
  };
}

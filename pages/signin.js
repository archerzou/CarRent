import React, { useState } from 'react';
import Link from 'next/link';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Header from '../components/header';
import Footer from '../components/footer';

const signin = () => {
  const initialvalues = {
    loginEmail: '',
    loginPassword: '',
    name: '',
    email: '',
    password: '',
    conf_password: '',
    success: '',
    error: '',
    login_error: '',
  };
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  const { loginEmail, loginPassword } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

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
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || '/');
    }
  };

  return (
    <>
      <Header />
      <div className="flex-col bg-gray_2 p-6 mx-2 sm:mx-20 ">
        <div className="flex items-center">
          <button type="button" className="flex p-2.5 text-lg border-2 hover:border-primary rounded-full">
            <BiLeftArrowAlt className="text-md sm:text-2xl hover:text-primary" />
          </button>
          <span className="text-md sm:text-2xl ml-4">
            We'd be happy to join us ! <Link href="/" className="text-primary underline underline-offset-8">Go Renting</Link>
          </span>
        </div>
        <div className="grid grid-cols-1 sm:gap-6 sm:grid-cols-2 mx-0 sm:mx-16">
          {/* login section */}
          <div className="w-full bg-white rounded-lg shadow my-10 sm:max-w-md xl:p-0 ">
            <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl ">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={signInHandler}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                  <input
                    type="email"
                    name="email"
                    value={loginEmail}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5"
                    placeholder="name@company.com"
                    required="true"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5"
                    required="true"
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
                  <a href="/forget" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
              </form>
            </div>
          </div>
          {/* register section */}
          <div className="w-full bg-white rounded-lg shadow my-10 sm:max-w-md xl:p-0">
            <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl ">
                Create and account
              </h1>
              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
                  <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="full name" required="" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" required="" />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                  <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" required="" />
                </div>
                <button type="submit" className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default signin;

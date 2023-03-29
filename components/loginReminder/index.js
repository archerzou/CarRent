import React from 'react';
import { signIn } from 'next-auth/react';

const LoginReminder = () => (
  <div className="grid justify-center p-12">
    <div
      className="block max-w-sm rounded-lg bg-white text-center shadow-lg"
    >
      <img
        className="rounded-t-lg px-3 py-6"
        src="/empty.png"
        alt=""
      />
      <div className="mx-auto grid justify-center">
        <h5
          className="mb-2 text-xl font-medium leading-tight text-neutral-800 "
        >
          Your need to login first
        </h5>
      </div>

    </div>
    <button type="button" onClick={() => signIn()} className="mx-auto font-bold my-4 text-white border-t-2 bg-gray-500 border-neutral-100 py-4 px-16 sm:px-28 rounded-md">
      SIGN IN / REGISTER
    </button>
  </div>
);

export default LoginReminder;

import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

const Empty = () => {
  const { data: session } = useSession();
  return (
    <div className="grid justify-center p-12">
      <div
        className="block max-w-sm rounded-lg bg-white text-center shadow-lg"
      >
        <img
          className="rounded-t-lg px-3 py-6"
          src="/empty.png"
          alt=""
        />
        <h5
          className="mb-2 text-xl font-medium leading-tight text-neutral-800 "
        >
          Your cart is empty
        </h5>
      </div>
      <div className="mx-auto grid justify-center">
        {!session && (
        <button type="button" onClick={() => signIn()} className="font-bold my-4 text-white border-t-2 bg-gray-500 border-neutral-100 py-4 px-6 rounded-md">
          SIGN IN / REGISTER
        </button>
        )}
        <Link href="/searchcar">
          <button type="button" className="font-bold border-t-2 bg-blue-500 text-white border-neutral-100 py-4 px-16 sm:px-36 rounded-md">
            RENT NOW
          </button>
        </Link>
      </div>

    </div>
  );
};

export default Empty;

import React from 'react';
import Link from 'next/link';
import { signOut, signIn } from 'next-auth/react';
// import { AiFillCar } from 'react-icons/ai';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { FaRegUserCircle } from 'react-icons/fa';
import { Popover } from '@headlessui/react';

const UserMenu = ({ session }) => (
  <Popover className="relative">
    {({ open }) => (
      /* Use the `open` state to conditionally change the direction of the chevron icon. */
      <>
        <Popover.Button className="flex ml-6 items-center focus:outline-none">
          {
            session ? (
              <div className="text-sm bg-gray-800 rounded-full">
                <img className="w-10 h-10 rounded-full" src={session?.user?.image} alt="user" />
              </div>
            ) : (
              <FaRegUserCircle className="text-3xl" />
            )
          }
          <RiArrowDropDownFill className={open ? 'rotate-180 transform text-3xl' : 'text-3xl'} />
        </Popover.Button>
        <Popover.Panel className="absolute -right-28 z-10 mt-3 sm:w-64 max-w-sm -translate-x-1/2 transform">
          <div className="overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative grid gap-8 bg-white pl-4 py-2">
              <div>
                <h4>Welcome to Morent !</h4>
              </div>
            </div>
            <div className="bg-gray-50 pl-4 py-2">
              {session ? (
                <div className="flex gap-4 items-center">
                  <div className="text-sm bg-gray-800 rounded-full">
                    <img className="w-16 h-16 rounded-full" src={session?.user?.image} alt="user" />
                  </div>
                  <div className="flex-col">
                    <h3 className="font-bold mb-1">{session?.user?.name}</h3>
                    <span
                      className="underline text-primary"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </span>
                  </div>
                </div>
              ) : (

                <div className="flex gap-5 items-center">
                  <a
                    href="/"
                    className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100"
                  >
                    <button type="button" className="text-white bg-primary py-1 w-20 rounded-md">
                      Register
                    </button>
                  </a>
                  <a
                    href="/"
                    className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100"
                  >
                    <button
                      type="button"
                      className="text-primary font-bold py-1 px-3 bg-gray-200 rounded-md w-20"
                      onClick={() => signIn()}
                    >
                      Login
                    </button>
                  </a>
                </div>
              )}
            </div>
            {
              session ? (
                <ul className="text-left bg-white my-1 mx-3 p-1">
                  <li className="hover:bg-gray-200  p-1 rounded-md">
                    <Link href="/profile">Account</Link>
                  </li>
                  <li className="hover:bg-gray-200  p-1 rounded-md">
                    <Link href="/profile/orders">My Orders</Link>
                  </li>
                  <li className="hover:bg-gray-200  p-1 rounded-md">
                    <Link href="/profile/messages">Message Center</Link>
                  </li>
                  <li className="hover:bg-gray-200  p-1 rounded-md">
                    <Link href="/profile/address">Address</Link>
                  </li>
                  <li className="hover:bg-gray-200  p-1 rounded-md">
                    <Link href="/profile/whishlist">Whishlist</Link>
                  </li>
                </ul>
              ) : null
            }

          </div>
        </Popover.Panel>
      </>
    )}
  </Popover>
);

export default UserMenu;

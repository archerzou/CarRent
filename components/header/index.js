import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';
import { navLinks } from '../../constants';
import UserMenu from './UserMenu';

const Header = () => {
  const [active, setActive] = useState('Home');
  const [toggle, setToggle] = useState(false);
  const { car } = useSelector((state) => ({ ...state }));
  const { data: session } = useSession();
  return (
    <div className="flex-col bg-white sm:px-16 px-6">
      <nav className="w-full flex py-6 justify-between items-center navbar">
        <Link href="/">
          <span className="font-bold text-2xl text-primary">MORENT</span>
        </Link>
        <div className="flex items-center">

          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-normal cursor-pointer text-[16px] ${
                  active === nav.title ? 'text-blue-500' : 'text-gray-500'
                } ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
                onClick={() => setActive(nav.title)}
              >
                <Link href={nav.id}>{nav.title}</Link>
              </li>
            ))}
          </ul>
          <UserMenu session={session} />
          <div className="sm:hidden flex flex-1 justify-start items-center">
            <img
              src={toggle ? '/close.png' : '/menu.png'}
              alt="menu"
              className="w-[24px] h-[24px] object-contain"
              onClick={() => setToggle(!toggle)}
            />

            <div
              className={`${
                !toggle ? 'hidden' : 'flex'
              } p-6 bg-gray-100 absolute top-14 right-0 mx-2 my-2 z-10 w-full rounded-xl`}
            >
              <ul className="list-none flex justify-end items-start flex-1 flex-col">
                {navLinks.map((nav, index) => (
                  <li
                    key={nav.id}
                    className={`cursor-pointer text-[16px] p-3 w-full rounded-md ${
                      active === nav.title ? 'text-white bg-blue-500' : 'text-black'
                    } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
                    onClick={() => setActive(nav.title)}
                  >
                    <Link href={nav.id}>{nav.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </nav>
    </div>

  );
};

export default Header;

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AiFillHeart, AiFillBell, AiTwotoneSetting, AiFillCar } from 'react-icons/ai';

import { useSession } from 'next-auth/react';

import UserMenu from './UserMenu';

const Header = () => {
  const { car } = useSelector((state) => ({ ...state }));
  const { data: session } = useSession();
  return (
    <div className="flex-col bg-white p-6 mx-2 sm:mx-14">
      <nav className="flex justify-between">
        <div className="flex text-white mr-6">
          <span className="font-bold text-2xl tracking-tight text-primary">MORENT</span>
        </div>
        <div className="flex items-center">
          <div>
            <ul className="hidden sm:flex place-items-end gap-6">
              <li>
                <button type="button" className="flex p-1.5 text-sm border-2 rounded-full">
                  <AiFillHeart className="text-lg" />
                </button>
              </li>
              <li>
                <button type="button" className="flex p-1.5 text-sm border-2 rounded-full">
                  <AiFillBell className="text-lg" />
                </button>
              </li>
              <li>
                <button type="button" className="flex p-1.5 text-sm border-2 rounded-full">
                  <AiTwotoneSetting className="text-lg" />
                </button>
              </li>
              <li>
                <Link href="/cart">
                  <button type="button" className="relative p-1.5 border-2 rounded-full items-center">
                    <AiFillCar className="text-xl" />
                    <div className="-top-1 left-6 absolute  w-5 h-5 bg-red-500 border-2 text-white text-xs border-white rounded-full">0</div>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          <UserMenu session={session} />
        </div>
      </nav>
    </div>

  );
};

export default Header;

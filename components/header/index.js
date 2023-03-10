import React from 'react';

const Header = () => {
  console.log('Header');
  return (
    <nav className="bg-gray border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex justify-between mx-auto">
        <a href="/">
          <span className="self-center text-blue-600 text-3xl font-semibold whitespace-nowrap">MORENT</span>
        </a>
        <div className="flex items-center md:order-2">
          <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4" id="user-button">
            <img className="w-12 h-12 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

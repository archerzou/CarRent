import React from 'react';

const Footer = () => (
  <footer className="p-4 bg-white rounded-lg md:px-6 md:py-8 mx-2 sm:mx-14">
    <div className="sm:flex sm:justify-between">
      <a href="https://flowbite.com/" className="flex-col items-start mb-4 sm:mb-0 w-80">
        <span className="font-bold text-2xl tracking-tight text-primary">MORENT</span>
        <p className="my-6">Our vision is to provide convenience and help increase your sales business.</p>
      </a>
      <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">About</h2>
          <ul className="text-gray-600">
            <li className="mb-2">
              <a href="/" className="hover:underline">How it works</a>
            </li>
            <li className="mb-2">
              <a href="h/" className="hover:underline">Featured</a>
            </li>
            <li className="mb-2">
              <a href="/" className="hover:underline">Partnership</a>
            </li>
            <li className="mb-2">
              <a href="h/" className="hover:underline">Bussiness Relation</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Community</h2>
          <ul className="text-gray-600">
            <li className="mb-2">
              <a href="/" className="hover:underline">Events</a>
            </li>
            <li className="mb-2">
              <a href="h/" className="hover:underline">Blog</a>
            </li>
            <li className="mb-2">
              <a href="/" className="hover:underline">Podcast</a>
            </li>
            <li className="mb-2">
              <a href="h/" className="hover:underline">Invite a friend</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Socials</h2>
          <ul className="text-gray-600">
            <li className="mb-2">
              <a href="/" className="hover:underline">Discord</a>
            </li>
            <li className="mb-2">
              <a href="h/" className="hover:underline">Instagram</a>
            </li>
            <li className="mb-2">
              <a href="/" className="hover:underline">Twitter</a>
            </li>
            <li className="mb-2">
              <a href="h/" className="hover:underline">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr className="my-6 border-gray-200 sm:mr-auto  lg:my-8" />
    <div className="sm:flex sm:items-center sm:justify-between">
      <span className="block text-sm text-gray-500 sm:text-center ">©2023 <a href="/" className="hover:underline">MORENT™</a>. All Rights Reserved.
      </span>
      <ul className="flex justify-between items-center mt-3 text-md text-gray-500 sm:mt-0 mr-12">
        <li>
          <a href="/" className="mr-4 hover:underline sm:mr-6">Privacy Policy</a>
        </li>
        <li>
          <a href="/" className="mr-4 hover:underline sm:mr-6">Licensing</a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;

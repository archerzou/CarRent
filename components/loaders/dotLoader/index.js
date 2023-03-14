import React from 'react';
import DotLoader from 'react-spinners/DotLoader';

const DotLoaderSpinner = ({ loading }) => (
  <div className="absolute w-screen h-screen z-1 bg-opacity-75 bg-gray-300">
    <DotLoader className="mx-auto mt-60" color="#3563E9" loading={loading} size={120} />
  </div>
);
export default DotLoaderSpinner;

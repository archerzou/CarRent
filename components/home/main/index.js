import React from 'react';
import SearchBar from './SearchBar';

const Main = ({ searchHandler }) => {
  console.log('homepage');
  return (
    <div className="mx-8 sm:mx-24">
      <SearchBar searchHandler={searchHandler} />
      <div>popular car</div>
    </div>
  );
};

export default Main;

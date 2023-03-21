import React, { useEffect } from 'react';
import axios from 'axios';

// import db from '../../utils/db';
// import Car from '../../models/Car';
import CarCard from '../carCard';
// import {
//   filterArray,
//   randomize,
//   removeDuplicates,
// } from '../../utils/arrays_utils';

const Search = () => {
  return (
    <div className="flex flex-wrap">
      <CarCard />
    </div>
  );
};

export default Search;

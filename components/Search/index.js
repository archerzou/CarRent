import React from 'react';
import axios from 'axios';

import db from '../../utils/db';
import Car from '../../models/Car';
import CarCard from '../carCard';
import {
  filterArray,
  randomize,
  removeDuplicates,
} from '../../utils/arrays_utils';

const Search = ({ cars }) => {
  console.log('frontend', cars);

  return (
    <div className="flex flex-wrap">
      <CarCard />
    </div>
  );
};

export default Search;

export async function getServerSideProps(ctx) {
  // -------------------------------------------------->
  const cars = await axios.get('http://localhost:3000/api/cars');

  console.log(cars);

  return {
    props: { cars: JSON.parse(JSON.stringify(cars)) },
  };
}

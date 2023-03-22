import React from 'react';
// import axios from 'axios';
import Link from 'next/link';

import db from '../utils/db';
import Car from '../models/Car';
import Header from '../components/header';
import Footer from '../components/footer';
import CarCard from '../components/carCard';
import PickUp from '../components/pickUp';
import SearchBar from '../components/searchBar';
import CarTypeFilter from '../components/carTypeFilter';
import CapacityFilter from '../components/capacityFilter';

const SearchCar = ({ cars, carTypes, capacities }) => {
  console.log('here', carTypes);
  console.log('there', capacities);

  return (
    <>
      <Header />
      <div className="flex justify-between bg-gray-100 py-0.5">
        <div className=" bg-white z-40 min-w-fit w-1/4 h-screen hidden sm:block py-10 px-8">
          <div className="flex-col items-center justify-center">
            {/* searchbar */}
            <p className="text-gray-500 text-sm">SEARCH</p>
            <SearchBar />
            {/* type filter */}
            <p className="text-gray-500 text-sm pt-12 pb-6">TYPE</p>
            <CarTypeFilter carTypes={carTypes} />
            {/* capacity filter */}
            <p className="text-gray-500 text-sm pt-14">CAPACITY</p>
            <CapacityFilter capacities={capacities} />
          </div>
        </div>
        <div className="flex-col mx-auto px-8">
          <PickUp />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-center">
            {cars.map((car) => (
              <CarCard car={car} key={car._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  db.connectDb();
  const cars = await Car.find().sort({ createdAt: -1 }).lean();
  const carTypes = await Car.find().distinct('carType');
  const capacities = await Car.find().distinct('capacity');
  console.log('there', capacities);

  return {
    props: {
      cars: JSON.parse(JSON.stringify(cars)),
      carTypes,
      capacities,
    },
  };
  // try {
  //   const response = await axios.get('http://localhost:3000/api/cars');
  //   const cars = response.data;

  //   return {
  //     props: { cars },
  //   };
  // } catch (error) {
  //   console.log(error.message);
  //   return {
  //     props: { cars: [] },
  //   };
  // }
}

export default SearchCar;

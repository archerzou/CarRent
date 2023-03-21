import React from 'react';
// import axios from 'axios';
import db from '../utils/db';
import Car from '../models/Car';

import Header from '../components/header';
import Footer from '../components/footer';
import CarCard from '../components/carCard';
import PickUp from '../components/pickUp';
import SearchBar from '../components/searchBar';

const SearchCar = ({ cars }) => {
  console.log('here', cars);

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
            <p className="text-gray-500 text-sm pt-14">TYPE</p>
            {/* capacity filter */}
            <p className="text-gray-500 text-sm pt-14">CAPACITY</p>
          </div>
        </div>
        <div className="flex-col mx-auto px-8">
          <PickUp />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-center">
            <CarCard />
            <CarCard />
            <CarCard />
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
  const carTypeDb = await Car.find().distinct('carType');
  const capacityDb = await Car.find().distinct('capacity');
  console.log('there', carTypeDb);

  return {
    props: { cars: JSON.parse(JSON.stringify(cars)) },
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

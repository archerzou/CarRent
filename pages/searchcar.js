import React from 'react';
// import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Pagination } from '@mui/material';

import db from '../utils/db';
import Car from '../models/Car';
import Header from '../components/header';
import Footer from '../components/footer';
import CarCard from '../components/carCard';
import PickUp from '../components/pickUp';
import SearchBar from '../components/searchBar';
import CarTypeFilter from '../components/carTypeFilter';
import CapacityFilter from '../components/capacityFilter';
import PriceFilter from '../components/priceFilter';

const SearchCar = ({ cars, carTypes, capacities, prices, paginationCount }) => {
  const router = useRouter();
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  const filter = ({
    search,
    carType,
    capacity,
    price,
    steering,
    gasoline,
    page,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (search) query.search = search;
    if (carType) query.carType = carType;
    if (capacity) query.capacity = capacity;
    if (price) query.price = price;
    if (steering) query.steering = steering;
    if (gasoline) query.gasoline = gasoline;
    if (page) query.page = page;

    router.push({
      pathname: path,
      query,
    });
  };

  const searchHandler = (search) => {
    if (search === '') {
      filter({ search: {} });
    } else {
      filter({ search });
    }
  };
  const carTypeHandler = (carType) => {
    filter({ carType });
  };
  const capacityHandler = (capacity) => {
    filter({ capacity });
  };
  const priceHandler = (price) => {
    filter({ price });
  };
  const pageHandler = (e, page) => {
    filter({ page });
  };

  const replaceQuery = (queryName, value) => {
    const existedQuery = router.query[queryName];
    const valueCheck = existedQuery?.search(value);
    const checked = existedQuery?.search(`_${value}`);
    let result = '';
    if (existedQuery) {
      if (existedQuery === value) {
        result = {};
      } else if (valueCheck !== -1) {
        if (checked !== -1) {
          result = existedQuery?.replace(`_${value}`, '');
        } else if (valueCheck === 0) {
          result = existedQuery?.replace(`${value}_`, '');
        } else {
          result = existedQuery?.replace(value, '');
        }
      } else {
        result = `${existedQuery}_${value}`;
      }
    } else {
      result = value;
    }
    return {
      result,
      active: !!(existedQuery && valueCheck !== -1),
    };
  };

  return (
    <>
      <Header />
      <div className="flex justify-between bg-gray-100 py-0.5">
        <div className=" bg-white z-40 min-w-fit w-1/4 h-screen hidden sm:block py-10 px-8">
          <div className="flex-col items-center justify-center">
            {/* searchbar */}
            <p className="text-gray-500 text-sm">SEARCH</p>
            <SearchBar searchHandler={searchHandler} />
            {/* type filter */}
            <p className="text-gray-500 text-sm pt-12 pb-4">TYPE</p>
            <CarTypeFilter
              carTypes={carTypes}
              carTypeHandler={carTypeHandler}
              replaceQuery={replaceQuery}
            />
            {/* capacity filter */}
            <p className="text-gray-500 text-sm pt-12 pb-4">CAPACITY</p>
            <CapacityFilter
              capacities={capacities}
              capacityHandler={capacityHandler}
              replaceQuery={replaceQuery}
            />
            {/* price filter */}
            <p className="text-gray-500 text-sm pt-12 pb-4">PRICE</p>
            <PriceFilter
              min={minPrice}
              max={maxPrice}
              priceHandler={priceHandler}
            />
          </div>
        </div>
        <div className="flex-col mx-auto px-8 pb-2">
          <PickUp />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-center">
            {cars.map((car) => (
              <CarCard car={car} key={car._id} />
            ))}
          </div>
          <div className="mx-auto flex w-full justify-center p-6">
            <Pagination
              count={paginationCount}
              defaultPage={1}
              onChange={pageHandler}
              variant="outlined"
              color="primary"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { query } = ctx;

  // -------------------------------------------------->
  // for multiple select string
  function createRegex(data, styleRegex) {
    let updateRegex = styleRegex;
    if (data.length > 1) {
      for (let i = 1; i < data.length; i += 1) {
        updateRegex += `|^${data[i]}`;
      }
    }
    return updateRegex;
  }
  // -----------------------------------
  const searchQuery = query.search || '';
  const priceQuery = query.price || '';
  const pageSize = 9;
  const page = query.page || 1;
  // -----------------------------------
  const carTypeQuery = query.carType?.split('_') || '';
  const carTypeRegex = `^${carTypeQuery[0]}`;
  const carTypeSearchRegex = createRegex(carTypeQuery, carTypeRegex);

  // -----------------------------------
  const capacityQuery = query.capacity?.split('_') || '';
  const capacityRegex = `^${capacityQuery[0]}`;
  const capacitySearchRegex = createRegex(capacityQuery, capacityRegex);

  // -----------------------------------
  const search = searchQuery && searchQuery !== ''
    ? {
      title: {
        $regex: searchQuery,
        $options: 'i',
      },
    }
    : {};

  const carType = carTypeQuery && carTypeQuery !== ''
    ? {
      carType: {
        $regex: carTypeSearchRegex,
        $options: 'i',
      },
    }
    : {};

  const capacity = capacityQuery && capacityQuery !== ''
    ? {
      capacity: {
        $regex: capacitySearchRegex,
        $options: 'i',
      },
    }
    : {};

  const price = priceQuery && priceQuery !== ''
    ? {
      price: {
        $lte: Number(priceQuery),
      },
    }
    : {};

  db.connectDb();
  const cars = await Car.find({
    ...search,
    ...carType,
    ...capacity,
    ...price,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .lean();
  const carTypes = await Car.find().distinct('carType').lean();
  const capacities = await Car.find().distinct('capacity').lean();
  const prices = await Car.find().distinct('price').lean();
  const totalCars = await Car.countDocuments({
    ...search,
    ...carType,
    ...capacity,
    ...price,
  });

  return {
    props: {
      cars: JSON.parse(JSON.stringify(cars)),
      carTypes,
      capacities,
      prices,
      paginationCount: Math.ceil(totalCars / pageSize),
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

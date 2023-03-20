import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import db from '../../utils/db';
// import Car from '../../models/Car';
import CarCard from '../carCard';

const Search = () => {
  const router = useRouter();
  const filter = ({
    search,
    title,
    brand,
    price,
    capacity,
    carType,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (search) query.search = search;
    if (title) query.title = title;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (capacity) query.capacity = capacity;
    if (carType) query.carType = carType;
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

  return (
    <div className="flex flex-wrap">
      <CarCard />
    </div>
  );
};

export default Search;

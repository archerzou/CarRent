import { useState } from 'react';
import Head from 'next/head';
import { AiFillHeart } from 'react-icons/ai';
import { Rating } from '@mui/material';

import db from '../../utils/db';
import Car from '../../models/Car';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ImageSwiper from '../../components/imageSwiper';

const carDtails = ({ car }) => {
  const [activeImg, setActiveImg] = useState('');
  const { title, carType, images, description, gasoline, steering, capacity, price } = car;
  return (
    <>
      <Head>
        <title>
          {car.title}
        </title>
      </Head>
      <Header />
      <div className="flex justify-center gap-8 bg-gray-100 py-8 px-24">
        <ImageSwiper images={images} activeImg={activeImg} />
        <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow sm:p-6 p-4 cursor-pointer ">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-900 font-bold sm:text-xl text-base py-2">
                {title}
              </p>
              <Rating readOnly value={4} />
            </div>
            <AiFillHeart className="p-0.5 sm:w-6 sm:h-6 w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="flex-col pt-6">
            {/* description */}
            <p className="leading-8 text-gray-700">{description}</p>
            {/* cartype  */}
            <div className="flex justify-between pt-6">
              <div className="flex">
                <p className="text-gray-400 font-medium">TypeCar</p>
                <p className="text-gray-700 font-semibold ml-10">{carType}</p>
              </div>
              <div className="flex">
                <p className="text-gray-400 font-medium">Capacity</p>
                <p className="text-gray-700 font-semibold ml-10">{capacity} Person</p>
              </div>
            </div>
            {/* sterring */}
            <div className="flex justify-between pt-6">
              <div className="flex">
                <p className="text-gray-400 font-medium">Steering</p>
                <p className="text-gray-700 font-semibold ml-10">{steering}</p>
              </div>
              <div className="flex">
                <p className="text-gray-400 font-medium">Gasoline</p>
                <p className="text-gray-700 font-semibold ml-10">{gasoline} Person</p>
              </div>
            </div>
            {/* last line */}
            <div className="flex pt-8 justify-between items-center">
              <p className="text-gray-900 font-bold sm:text-xl">
                ${price}/
                <span className="text-gray-400 sm:text-sm text-x">
                  day
                </span>
              </p>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default carDtails;

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;
  db.connectDb();
  //-------------
  const car = await Car.findById(id).lean();

  return {
    props: {
      car: JSON.parse(JSON.stringify(car)),
    },
  };
}

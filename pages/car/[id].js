import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { AiFillHeart } from 'react-icons/ai';
import { Rating } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signIn, useSession } from 'next-auth/react';

import db from '../../utils/db';
import Car from '../../models/Car';
import User from '../../models/User';
import DialogModal from '../../components/dialogModal';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ImageSwiper from '../../components/imageSwiper';
import Reviews from '../../components/reviews';
import { hideDialog, showDialog } from '../../store/DialogSlice';

const carDtails = ({ car, whishlists }) => {
  const dispatch = useDispatch();
  const [activeImg, setActiveImg] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const { data: session } = useSession();
  const { title, carType, images, description, gasoline, steering, capacity, price, rating, numReviews } = car;

  useEffect(() => {
    if (session) {
      setIsFavorited(!!whishlists?.find((e) => e?.car === car?._id));
    }
  }, [whishlists, car]);

  useEffect(() => {
    dispatch(hideDialog());
  }, []);
  ///---------------------------------
  const handleWishList = async () => {
    try {
      if (!session) {
        return signIn();
      }
      const { data } = await axios.put('/api/user/wishlist', {
        carId: car._id,
      });
      setIsFavorited((prev) => !prev);
      dispatch(
        showDialog({
          header: 'Car Whishlist updated Successfully',
          msgs: [
            {
              msg: data.message,
              type: 'success',
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(
        showDialog({
          header: 'Whishlist Error',
          msgs: [
            {
              msg: error.response.data.message,
              type: 'error',
            },
          ],
        }),
      );
    }
  };
  return (
    <>
      <Head>
        <title>
          {car.title}
        </title>
      </Head>
      <DialogModal />
      <Header />
      <div className="flex-col bg-gray-100 py-8 px-24">
        <div className="flex justify-center gap-8 ">
          <ImageSwiper images={images} activeImg={activeImg} />
          {/* car info */}
          <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow sm:p-6 p-4 cursor-pointer ">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-900 font-bold sm:text-xl text-base py-2">
                  {title}
                </p>
                <div className="flex flex-wrap">
                  <Rating
                    precision={0.5}
                    readOnly
                    defaultValue={rating}
                  />
                  ({numReviews}
                  {numReviews === 1 ? ' review' : ' reviews'})
                </div>
              </div>
              <button type="button" onClick={() => handleWishList()}>
                <AiFillHeart className={`${isFavorited ? 'text-red-700' : 'text-gray-400'} p-0.5 sm:w-6 sm:h-6 w-3.5 h-3.5`} />
              </button>
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
                  className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <Reviews car={car} />
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
  const car = await Car.findById(id)
    .populate({ path: 'reviews.reviewBy', model: User })
    .lean();
  const whishlists = await User.find().distinct('wishlist').lean();

  //------------
  function calculatePercentage(num) {
    return (
      (car.reviews.reduce((a, review) => (
        a
          + (review.rating === Number(num) || review.rating === Number(num) + 0.5)
      ), 0)
        * 100)
      / car.reviews.length
    ).toFixed(1);
  }

  const newCar = {
    ...car,
    ratings: [
      {
        percentage: calculatePercentage('5'),
      },
      {
        percentage: calculatePercentage('4'),
      },
      {
        percentage: calculatePercentage('3'),
      },
      {
        percentage: calculatePercentage('2'),
      },
      {
        percentage: calculatePercentage('1'),
      },
    ],
    reviews: car.reviews.reverse(),
  };

  return {
    props: {
      car: JSON.parse(JSON.stringify(newCar)),
      whishlists: JSON.parse(JSON.stringify(whishlists)),
    },
  };
}

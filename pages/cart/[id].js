import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { useSession, signIn } from 'next-auth/react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Empty from '../../components/cart/empty';
import CarDetails from '../../components/cadDetails';
import { updateCart } from '../../store/cartSlice';

import db from '../../utils/db';
import Car from '../../models/Car';
import User from '../../models/User';

const cart = ({ car, whishlists }) => {
  const Router = useRouter();
  const { data: session } = useSession();
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  console.log('first', cart);

  return (
    <>
      <Header />
      {
        cart.cartItems.length > 0 ? (
          <CarDetails car={car} whishlists={whishlists} />
        ) : (
          <Empty />
        )
      }

      <Footer />
    </>
  );
};

export default cart;

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

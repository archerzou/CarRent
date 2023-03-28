import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { useSession, signIn } from 'next-auth/react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Empty from '../../components/cart/empty';
import CarDetails from '../../components/cadDetails';
import Pickup from '../../components/cart/pickup';
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
        session ? (
          <div className="flex-col bg-gray-100 py-8 px-24">
            <CarDetails car={car} whishlists={whishlists} />
            <Pickup />
          </div>

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

  return {
    props: {
      car: JSON.parse(JSON.stringify(car)),
      whishlists: JSON.parse(JSON.stringify(whishlists)),
    },
  };
}

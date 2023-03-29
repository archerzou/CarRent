import React from 'react';
import { useSession, signIn } from 'next-auth/react';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Header from '../components/header';
import Footer from '../components/footer';
import Empty from '../components/cart/empty';
import { updateCart } from '../store/cartSlice';

const cart = () => {
  const Router = useRouter();
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      {
        cart.cartItems.length > 0 ? (
          <div className="flex-col bg-gray-100 py-8 px-24">
            Car1
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

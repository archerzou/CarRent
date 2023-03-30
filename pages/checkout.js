import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import User from '../models/User';
import Cart from '../models/Cart';
import db from '../utils/db';

import Header from '../components/header';
import Footer from '../components/footer';
import Shipping from '../components/checkout/shipping';
import Cars from '../components/checkout/cars';
import Payment from '../components/checkout/payment';

const Checkout = ({ cart, user }) => {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  // useEffect(() => {
  //   const check = addresses.find((ad) => ad.active === true);
  //   if (check) {
  //     setSelectedAddress(check);
  //   } else {
  //     setSelectedAddress('');
  //   }
  // }, [addresses]);
  return (
    <>
      <Header />
      <div className="flex bg-gray_2 py-4 sm:p-4 mx-auto">
        <div className="flex-col">
          <Shipping
            user={user}
            addresses={addresses}
            setAddresses={setAddresses}
          />
          <Cars cart={cart} />
        </div>
        <Payment />
      </div>

      <Footer />
    </>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  db.connectDb();
  const session = await getSession(context);
  const user = await User.findById(session.user.id);
  const cart = await Cart.findOne({ user: user._id });
  db.disconnectDb();
  if (!cart) {
    return {
      redirect: {
        destination: '/cart',
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

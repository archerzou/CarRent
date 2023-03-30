import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import User from '../models/User';
import Cart from '../models/Cart';
import db from '../utils/db';

const Checkout = ({ cart, user }) => {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  return (
    <div>Checkout</div>
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

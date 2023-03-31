import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { Form, Formik } from 'formik';

const Summary = ({ user, cart, paymentMethod, selectedAddress }) => {
  const [error, setError] = useState('');
  const applyCouponHandler = () => {
    console.log('apply coupon');
  };
  const placeOrderHandler = async () => {
    try {
      if (paymentMethod === '') {
        setError('Please choose a payment method.');
        return;
      } if (!selectedAddress) {
        setError('Please choose a shipping address.');
        return;
      }
      const { data } = await axios.post('/api/order/create', {
        products: cart.products,
        shippingAddress: selectedAddress,
        paymentMethod,
        total: cart.cartTotal,
      });
      Router.push(`/order/${data.order_id}`);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="flex-col">
      <p className="p-4 text-left font-semibold leading-tight tracking-tight text-gray-900 text-xl py-3 ">Order Summary</p>
      <div className="mx-2 p-2">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Apply Coupon</label>
        <input
          name="coupon"
          placeholder="Coupon number"
          onChange={applyCouponHandler}
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
        />
        <p className="text-grap-900 text-xl"> Total : <b>{cart.cartTotal}$</b>{' '}</p>
        <button type="button" className="my-6 p-2.5 block w-full text-white bg-blue-500 font-bold rounded-lg text-xl text-center" onClick={() => placeOrderHandler()}>
          Place Order
        </button>
      </div>
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
};

export default Summary;

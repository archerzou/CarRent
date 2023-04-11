import { useReducer, useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { IoIosArrowForward } from 'react-icons/io';
import dateFormat from 'dateformat';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Order from '../../models/Order';
import User from '../../models/User';
import db from '../../utils/db';
import { calculateDays } from '../../utils/calculateDays';
import StripePayment from '../../components/stripePayment';

function reducer(state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'PAY_ REQUEST':
      return { ...state, loading: true };
    case 'PAY_SUCCESS':
      return { ...state, loading: false, success: true };
    case 'PAY_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_RESET':
      return { ...state, loading: false, success: false, error: false };
  }
}

const order = ({ orderData, paypalClientId, stripePublicKey }) => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    success: '',
  });
  useEffect(() => {
    if (!orderData._id) {
      dispatch({
        type: 'PAY_RESET',
      });
    } else {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypalClientId,
          currency: 'USD',
        },
      });
      paypalDispatch({
        type: 'setLoadingStatus',
        value: 'pending',
      });
    }
  }, [order]);

  const createOrderHanlder = (data, actions) => actions.order
    .create({
      purchase_units: [
        {
          amount: {
            value: orderData.total,
          },
        },
      ],
    })
    .then((orderId) => orderId);
  const onApproveHandler = (data, actions) => actions.order.capture().then(async (details) => {
    try {
      dispatch({ type: 'PAY_REQUEST' });
      const { data } = await axios.put(
        `/api/order/${orderData._id}/pay`,
        details,
      );
      dispatch({ type: 'PAY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'PAY_ERROR', payload: error });
    }
  });
  const onErroHandler = (error) => {
    console.log(error);
  };
  return (
    <>
      <Header />
      <div className="flex bg-gray_2 mx-auto">
        <div className="flex-col mx-6 bg-white rounded-lg shadow my-8 sm:max-w-6xl p-4">
          <div className="w-full">
            <p className="flex text-gray-500 items-center text-lg py-3">Home <IoIosArrowForward /> Orders <IoIosArrowForward /> ID{' '}{orderData._id}</p>
            <div className="flex py-3 ext-gray-900 text-lg font-bold">
              Payment Status : {' '}
              {orderData.isPaid ? (
                <img src="/verified.png" alt="paid" />
              ) : (
                <img className="w-6 h-6" src="/unverified.png" alt="paid" />
              )}
            </div>
            <div className="flex py-3">
              <p className="text-gray-900 text-lg font-bold">Order Status : {orderData.status}</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex-col">
            {orderData.cars.map((car, i) => (
              <div key={i} className="grid grid-cols-2 items-start">
                <img src={car.image} alt="" className="h-auto max-w-full rounded-lg" />
                <div className="flex-col justify-start p-6">
                  <p className="text-xl font-bold text-gray-900 py-2">{car.title}</p>
                  <p className="text-xl font-bold text-gray-900 py-2">
                    ${car.price * calculateDays(car.startDate, car.endDate)}
                  </p>
                  <p className="text-xl font-bold text-gray-500 py-2">Pick up: {car.pickLocation}</p>
                  <p className="text-xl font-bold text-gray-500 py-2">Drop off: {car.dropLocation}</p>
                  <p className="text-xl font-bold text-gray-500 py-2">Rent From: {dateFormat(car.startDate, 'yyyy-mm-dd')}</p>
                  <p className="text-xl font-bold text-gray-500 py-2">Rent To: {dateFormat(car.endDate, 'yyyy-mm-dd')}</p>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center py-3">
            <p className="text-gray-900 text-lg font-bold">TOTAL TO PAY</p>
            <p className="text-blue-600 text-lg font-bold mx-2">{orderData.total}$</p>
          </div>
        </div>
        <div className="flex-col items-center mx-auto w-1/4">
          <div className="w-full bg-white rounded-lg shadow my-8 p-3">
            <p className="text-gray-900 text-xl font-bold py-3">Customer's Order</p>
            <div className="flex gap-2">
              <img className="w-8 h-8" src={orderData.user.image} alt="" />
              <div>
                <p className="text-gray-500 text-lg p-3">{orderData.user.name}</p>
                <p className="text-gray-500 text-lg pb-3">{orderData.user.email}</p>
              </div>
            </div>
            <hr className="my-4" />
            <p className="text-gray-900 text-xl font-bold py-3">Shipping Address</p>
            <p className="py-2 mx-2">
              {orderData.shippingAddress.clientName}
            </p>
            <p className="py-2 mx-2">{orderData.shippingAddress.address}</p>
            <p className="py-2 mx-2">
              {orderData.shippingAddress.city}
            </p>
          </div>
          <button
            type="submit"
            className="my-6 p-2.5 block w-full text-white bg-blue-500 font-semibold rounded-lg text-xl text-center"
          >
            PAY
          </button>
          {/* {orderData.paymentMethod === 'credit_card' && (
            <StripePayment
              total={orderData.total}
              order_id={orderData._id}
              stripe_public_key={stripePublicKey}
            />
            )} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default order;

export async function getServerSideProps(context) {
  db.connectDb();
  const { query } = context;
  const { id } = query;
  const order = await Order.findById(id)
    .populate({ path: 'user', model: User })
    .lean();
  const paypalClientId = process.env.PAYPAL_CLIENT_ID;
  const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
  db.disconnectDb();
  return {
    props: {
      orderData: JSON.parse(JSON.stringify(order)),
      paypalClientId,
      stripePublicKey,
    },
  };
}

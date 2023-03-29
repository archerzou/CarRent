import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Header from '../components/header';
import Footer from '../components/footer';
import Empty from '../components/cart/empty';
import CartCar from '../components/cart/cartcar';
import { updateCart } from '../store/cartSlice';

const cart = () => {
  const Router = useRouter();
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  return (
    <>
      <Header />
      <div className="flex-col bg-gray-100 py-10 px-24">
        <h1 className="mb-4 text-center text-2xl font-bold">Retenal Cars in Cart</h1>
        <div className="mx-auto justify-center px-6 gap-8 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg w-full">
            {
              cart.cartItems.length > 0 ? (
                <div className="flex-col bg-gray-100 py-8 px-24">
                  {cart.cartItems.map((car) => (
                    <CartCar
                      car={car}
                      key={car._id}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  ))}
                </div>

              ) : (
                <Empty />
              )
            }
          </div>

          {/* <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">$129.99</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button type="button" className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
          </div> */}
        </div>

      </div>

      <Footer />
    </>
  );
};

export default cart;

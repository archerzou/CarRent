import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import db from '../utils/db';
import Car from '../models/Car';
import Header from '../components/header';
import Footer from '../components/footer';
import Empty from '../components/cart/empty';
import CartCar from '../components/cart/cartcar';
import Checkout from '../components/cart/checkout';
import CartHeader from '../components/cart/cartHeader';
import { calculateDays } from '../utils/calculateDays';
import { saveCart } from '../requests/user';

const Cart = ({ locations }) => {
  const Router = useRouter();
  const { data: session } = useSession();
  const { cart } = useSelector((state) => ({ ...state }));
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      (
        selected.reduce((a, c) => a + c.price * calculateDays(c.startDate, c.endDate), 0)
      ).toFixed(2),
    );
  }, [selected]);

  //-----------------------
  const saveCartToDbHandler = async () => {
    if (session) {
      const res = saveCart(selected);
      Router.push('/checkout');
    } else {
      signIn();
    }
  };
  return (
    <>
      <Header />
      {
          cart.cartItems.length > 0 ? (
            <div className="flex-col bg-gray-100 py-10 px-24">
              <CartHeader
                cartItems={cart.cartItems}
                selected={selected}
                setSelected={setSelected}
              />
              <div className="mx-auto justify-center px-6 gap-8 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg w-full">
                  <div className="flex-col bg-gray-100 py-4 px-24">
                    {cart.cartItems?.map((car) => (
                      <CartCar
                        car={car}
                        key={car._id}
                        selected={selected}
                        setSelected={setSelected}
                        locations={locations}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Checkout
                total={total}
                selected={selected}
                saveCartToDbHandler={saveCartToDbHandler}
              />

            </div>
          ) : (
            <Empty />
          )
        }
      <Footer />
    </>
  );
};

export default Cart;

export async function getServerSideProps() {
  db.connectDb();
  const locations = await Car.find().distinct('location').lean();

  return {
    props: {
      locations: JSON.parse(JSON.stringify(locations)),
    },
  };
}

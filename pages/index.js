import { useSession, signIn, signOut } from 'next-auth/react';

import Header from '../components/header';
import Footer from '../components/footer';
import Main from '../components/main';
import db from '../utils/db';
import Car from '../models/Car';

const Home = ({ popCars, recommendCars }) => {
  const { data: session } = useSession();
  return (
    <div>
      <Header />
      <Main popCars={popCars} recommendCars={recommendCars} />
      <Footer />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  db.connectDb();
  const popCars = await Car.find().sort({ numReviews: -1 }).lean();
  const recommendCars = await Car.find().sort({ rating: -1 }).lean();

  return {
    props: {
      popCars: JSON.parse(JSON.stringify(popCars)),
      recommendCars: JSON.parse(JSON.stringify(recommendCars)),
    },
  };
}

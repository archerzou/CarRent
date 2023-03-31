import { useSession } from 'next-auth/react';

import Header from '../components/header';
import Footer from '../components/footer';
import Main from '../components/main';
import db from '../utils/db';
import Car from '../models/Car';

const Home = ({ popCars, recommendCars, locations }) => {
  const { data: session } = useSession();
  return (
    <div>
      <Header />
      <Main popCars={popCars} recommendCars={recommendCars} locations={locations} />
      <Footer />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  db.connectDb();
  const popCars = await Car.find().sort({ numReviews: -1 }).limit(4).lean();
  const recommendCars = await Car.find().sort({ rating: -1 }).limit(8).lean();
  const locations = await Car.find().distinct('location').lean();

  return {
    props: {
      popCars: JSON.parse(JSON.stringify(popCars)),
      recommendCars: JSON.parse(JSON.stringify(recommendCars)),
      locations: JSON.parse(JSON.stringify(locations)),
    },
  };
}

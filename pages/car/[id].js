import Head from 'next/head';
import db from '../../utils/db';
import Car from '../../models/Car';
import User from '../../models/User';
import Header from '../../components/header';
import Footer from '../../components/footer';
import CarDetails from '../../components/cadDetails';
import Reviews from '../../components/reviews';

const carDtails = ({ car, whishlists }) => (
  <>
    <Head>
      <title>
        {car.title}
      </title>
    </Head>

    <Header />
    <div className="flex-col bg-gray-100 py-8 px-24">
      <CarDetails car={car} whishlists={whishlists} show />
      <Reviews car={car} />
    </div>
    <Footer />
  </>
);

export default carDtails;

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;
  db.connectDb();
  //-------------
  const car = await Car.findById(id)
    .populate({ path: 'reviews.reviewBy', model: User })
    .lean();
  const whishlists = await User.find().distinct('wishlist').lean();

  //------------
  function calculatePercentage(num) {
    return (
      (car.reviews.reduce((a, review) => (
        a
          + (review.rating === Number(num) || review.rating === Number(num) + 0.5)
      ), 0)
        * 100)
      / car.reviews.length
    ).toFixed(1);
  }

  const newCar = {
    ...car,
    ratings: [
      {
        percentage: calculatePercentage('5'),
      },
      {
        percentage: calculatePercentage('4'),
      },
      {
        percentage: calculatePercentage('3'),
      },
      {
        percentage: calculatePercentage('2'),
      },
      {
        percentage: calculatePercentage('1'),
      },
    ],
    reviews: car.reviews.reverse(),
  };

  return {
    props: {
      car: JSON.parse(JSON.stringify(newCar)),
      whishlists: JSON.parse(JSON.stringify(whishlists)),
    },
  };
}

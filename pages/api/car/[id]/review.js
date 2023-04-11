import nc from 'next-connect';
import db from '../../../../utils/db';
import Car from '../../../../models/Car';
import auth from '../../../../middleware/auth';

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const car = await Car.findById(req.query.id);
    if (car) {
      const exist = car.reviews.find(
        (x) => x.reviewBy.toString() === req.user,
      );
      if (exist) {
        await Car.updateOne(
          {
            _id: req.query.id,
            'reviews._id': exist._id,
          },
          {
            $set: {
              'reviews.$.review': req.body.review,
              'reviews.$.rating': req.body.rating,
              'reviews.$.images': req.body.images,
            },
          },
          {
            new: true,
          },
        );

        const updatedCar = await Car.findById(req.query.id);
        updatedCar.numReviews = updatedCar.reviews.length;
        updatedCar.rating = updatedCar.reviews.reduce((a, r) => r.rating + a, 0)
          / updatedCar.reviews.length;
        await updatedCar.save();
        await updatedCar.populate('reviews.reviewBy');
        await db.disconnectDb();
        return res
          .status(200)
          .json({ reviews: updatedCar.reviews.reverse() });
      }
      const review = {
        reviewBy: req.user,
        rating: req.body.rating,
        review: req.body.review,
        images: req.body.images,
      };
      car.reviews.push(review);
      car.numReviews = car.reviews.length;
      car.rating = car.reviews.reduce((a, r) => r.rating + a, 0)
          / car.reviews.length;
      await car.save();
      await car.populate('reviews.reviewBy');
      await db.disconnectDb();
      return res.status(200).json({ reviews: car.reviews.reverse() });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;

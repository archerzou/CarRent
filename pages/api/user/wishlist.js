import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db';
import auth from '../../../middleware/auth';

const handler = nc().use(auth);
handler.put(async (req, res) => {
  try {
    db.connectDb();
    const { carId } = req.body;
    const user = await User.findById(req.user);
    const newWish = JSON.parse(JSON.stringify(user.wishlist));
    const exist = newWish.find((x) => x.car === carId);

    if (exist) {
      await user.updateOne({
        $pull: {
          wishlist: {
            car: carId,
          },
        },
      });
      db.disconnectDb();
      return res
        .status(200)
        .json({ message: 'Car has already been removed in your wishlist.' });
    }
    await user.updateOne({
      $push: {
        wishlist: {
          car: carId,
        },
      },
    });
    db.disconnectDb();
    res
      .status(200)
      .json({ message: 'Car succesfully added to your wishlist.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default handler;

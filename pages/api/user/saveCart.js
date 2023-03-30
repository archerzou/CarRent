import nc from 'next-connect';
import Car from '../../../models/Car';
import User from '../../../models/User';
import Cart from '../../../models/Cart';
import db from '../../../utils/db';
import auth from '../../../middleware/auth';
import { calculateDays } from '../../../utils/calculateDays';

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { cart } = req.body;
    const cars = [];
    const user = await User.findById(req.user);
    const existingCart = await Cart.findOne({ user: user._id });
    if (existingCart) {
      await existingCart.remove();
    }
    for (let i = 0; i < cart.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const dbCar = await Car.findById(cart[i]._id).lean();
      const tempCar = {};
      tempCar.title = dbCar.title;
      tempCar.car = dbCar._id;
      tempCar.image = dbCar.images[0].url;
      tempCar.pickLocation = cart[i].pickLocation;
      tempCar.dropLocation = cart[i].dropLocation;
      tempCar.startDate = cart[i].startDate;
      tempCar.endDate = cart[i].endDate;
      tempCar.price = dbCar.price;

      cars.push(tempCar);
    }
    let cartTotal = 0;

    for (let i = 0; i < cars.length; i += 1) {
      cartTotal += cars[i].price * calculateDays(cars[i].startDate, cars[i].endDate);
    }
    await new Cart({
      cars,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();
    db.disconnectDb();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;

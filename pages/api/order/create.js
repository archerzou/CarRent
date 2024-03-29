import nc from 'next-connect';
import User from '../../../models/User';
import Order from '../../../models/Order';
import db from '../../../utils/db';
import auth from '../../../middleware/auth';

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const {
      cars,
      shippingAddress,
      paymentMethod,
      total,
    } = req.body;
    const user = await User.findById(req.user);
    const newOrder = await new Order({
      user: user._id,
      cars,
      shippingAddress,
      paymentMethod,
      total,
    }).save();
    db.disconnectDb();
    return res.json({
      order_id: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default handler;

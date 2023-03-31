import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db';
import auth from '../../../middleware/auth';

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.body;
    const user = await User.findById(req.user);
    const userAddresses = user.address;
    const addresses = [];
    for (let i = 0; i < userAddresses.length; i += 1) {
      let tempAddress = {};
      if (userAddresses[i]._id.valueOf() === id) {
        tempAddress = { ...userAddresses[i].toObject(), active: true };
        addresses.push(tempAddress);
      } else {
        tempAddress = { ...userAddresses[i].toObject(), active: false };
        addresses.push(tempAddress);
      }
    }
    await user.updateOne(
      {
        address: addresses,
      },
      { new: true },
    );
    db.disconnectDb();
    return res.json({ addresses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.body;
    const user = await User.findById(req.user);
    await user.updateOne(
      {
        $pull: { address: { _id: id } },
      },
      { new: true },
    );
    db.disconnectDb();
    res.json({ addresses: user.address.filter((a) => a._id !== id) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;

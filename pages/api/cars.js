import nc from 'next-connect';
import Car from '../../models/Car';
import db from '../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  try {
    db.connectDb();
    const cars = await Car.find({});
    db.disconnectDb();
    res.send(cars);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;

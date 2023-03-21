import nc from 'next-connect';
import Car from '../../models/Car';
import db from '../../utils/db';

// Connect to database
db.connectDb();

const handler = nc();

handler.get(async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).send(cars);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;

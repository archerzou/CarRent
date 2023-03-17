import nc from 'next-connect';
import Car from '../../../../models/Car';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.query;
    const car = await Car.findById(id).lean();
    db.disconnectDb();
    return res.json({
      _id: car._id,
      title: car.title,
      brand: car.brand,
      description: car.description,
      price: car.price,
      capacity: car.capacity,
      carType: car.carType,
      location: car.location,
      image: car.image,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;

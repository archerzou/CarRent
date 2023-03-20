import nc from 'next-connect';
import db from '../../../../utils/db';
import Car from '../../../../models/Car';

const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const newCar = new Car({
      title: req.body.title,
      brand: req.body.brand,
      description: req.body.description,
      price: req.body.price,
      capacity: req.body.capacity,
      carType: req.body.carType,
      location: req.body.location,
      steering: req.body.steering,
      gasoline: req.body.gasoline,
      images: req.body.images,
    });
    await newCar.save();
    res.status(200).json({ message: 'New car created Successfully.' });
    db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;

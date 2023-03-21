import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    brand: {
      type: String,
      required: [true, 'brand is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    capacity: {
      type: Number,
      required: [true, 'capacity is required'],
    },
    carType: {
      type: String,
      required: [true, 'type is required'],
    },
    location: {
      type: String,
      required: [true, 'location is required'],
    },
    steering: {
      type: String,
      required: [true, 'steering is required'],
    },
    gasoline: {
      type: Number,
      required: [true, 'gasoline is required'],
    },
    images: [],
  },
  {
    timestamps: true,
  },
);

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

export default Car;


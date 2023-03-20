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
      requried: [true, 'type is required'],
    },
    location: {
      type: String,
      required: [true, 'location is required'],
    },
    steering: {
      type: String,
      required: [true, 'steering is required'],
      default: 'Manual',
    },
    gasoline: {
      type: Number,
      required: [true, 'gasoline is required'],
      default: 70,
    },
    images: [],
  },
  {
    timestamps: true,
  },
);
const Car = mongoose.models.car || mongoose.model('car', carSchema);

export default Car;


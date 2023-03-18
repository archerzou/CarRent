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
    image: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDbibpeXlIGCDVjp_U9SpuYdMow7cS2ki1Q&usqp=CAU',
    },
  },
  {
    timestamps: true,
  },
);
const Car = mongoose.models.car || mongoose.model('car', carSchema);

export default Car;


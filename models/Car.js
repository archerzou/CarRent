import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    reviewBy: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    review: {
      type: String,
      required: true,
    },
    images: [],
    likes: [],
  },
  {
    timestamps: true,
  },
);

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
      type: String,
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
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    renting: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

export default Car;


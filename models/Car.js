import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    carType: {
      type: String,
      requried: true,
    }

    slug: {
      type: String,
      required: true,
      unique: true,
      // lowercase: true,
    },
    category: {
      type: ObjectId,
      required: true,
      ref: 'Category',
    },
    subCategories: [
      {
        type: ObjectId,
        ref: 'subCategory',
      },
    ],
    details: [
      {
        name: String,
        value: String,
      },
    ],
    questions: [
      {
        question: String,
        answer: String,
      },
    ],
    reviews: [reviewSchema],
    refundPolicy: {
      type: String,
      default: '30 days',
    },
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
    shipping: {
      type: Number,
      required: true,
      default: 0,
    },
    subProducts: [
      {
        sku: String,
        images: [],
        description_images: [],
        color: {
          color: {
            type: String,
          },
          image: {
            type: String,
          },
        },
        sizes: [
          {
            size: String,
            qty: Number,
            price: Number,
          },
        ],
        discount: {
          type: Number,
          default: 0,
        },
        sold: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
const car = mongoose.models.car || mongoose.model('car', carSchema);


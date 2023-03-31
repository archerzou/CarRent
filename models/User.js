import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Please enter your full name.',
    },
    email: {
      type: String,
      required: 'Please enter your email address.',
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: '"Please enter a password.',
    },
    role: {
      type: String,
      default: 'user',
    },
    image: {
      type: String,
      // image url to cloudinary, current just use a random avatar
      default:
        'https://res.cloudinary.com/kevinzou/image/upload/v1680252619/image/65343975_ucc8ys.jpg',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: '',
    },
    address: [
      {
        clientName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address: {
          type: String,
        },
        city: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
    wishlist: [
      {
        car: {
          type: ObjectId,
          ref: 'Car',
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

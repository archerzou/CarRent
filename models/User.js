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
        'https://gravatar.com/avatar/17b5878738746d1b09917ee45eb27efd?s=400&d=robohash&r=x',
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
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
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
        product: {
          type: ObjectId,
          ref: 'Car',
        },
        style: {
          type: String,
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

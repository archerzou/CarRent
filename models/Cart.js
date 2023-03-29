import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    cars: [
      {
        car: {
          type: ObjectId,
          ref: 'Car',
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
        pickLocation: {
          type: String,
        },
        dropLocation: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        price: Number,
      },
    ],
    cartTotal: Number,
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;

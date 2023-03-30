import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    cars: [
      {
        car: {
          type: ObjectId,
          ref: 'Car',
        },
        title: {
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
        price: {
          type: Number,
        },
      },
    ],
    shippingAddress: {
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
    },
    paymentResult: {
      id: String,
      status: String,
      email: String,
    },
    total: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not Processed',
        'Processing',
        'Dispatched',
        'Cancelled',
        'Completed',
      ],
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;

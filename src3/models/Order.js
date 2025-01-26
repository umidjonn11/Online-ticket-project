import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // ticket:{
    //   type: Schema.Types.ObjectId,
    //   ref: 'Ticket',
    //   required: true,
    // },
    tickets: [
      {
        ticket: {
          type: Schema.Types.ObjectId,
          ref: 'Ticket',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Order = model('order', orderSchema);
const { Schema, model, Types} = require("mongoose");
const schema = Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'user',
      required: [true, 'Order must be belong to user'],
    },
    cartItems: [
      {
        product: {
          type: Types.ObjectId,
          ref: 'product',
        },
        quantity: Number,
        price: Number,
      },
    ],

    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      details: String,
      street: String,
      phone: String,
      city: String,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalOrderPrice: {
      type: Number,
    },
    paymentMethodType: {
      type: String,
      enum: ['card', 'cash'],
      default: 'cash',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);
schema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name image email phone',
  }).populate({
    path: 'cartItems.product',
    select: 'name image ',
  });

  next();
});

module.exports = model("Order", schema);


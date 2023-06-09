const factory = require("../Handlers/handler.factory");
const productModel = require("../product/product.model");
const Order = require("./order.model");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const userModel = require("../users/user.model");
const cartModel = require("../cart/cart.model");
const Stripe = require('stripe');

// @desc    create cash order
// @route   POST /api/v1/orders/cartId
// @access  Protected/User
exports.createCashOrder = catchAsyncError(async (req, res, next) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get cart depend on cartId
  const cart = await cartModel.findOne({user: req.user._id });
  if (!cart) {
    return next(
      new AppError(`There is no such cart with this user`, 404)
    );
  }
  // 2) Get order price depend on cart price "Check if coupon apply"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // 3) Create order with default paymentMethodType cash
  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });
  // 4) After creating order, decrement product quantity, increment product sold
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await productModel.bulkWrite(bulkOption, {});

    // 5) Clear cart depend on cartId
    await cartModel.findOneAndDelete({user: req.user._id });
  }

  res.status(201).json({ status: "success", data: order });
});

exports.filterOrderForLoggedUser = catchAsyncError(async (req, res, next) => {
  if (req.user.role === "user") req.filterObj = { user: req.user._id };
  next();
});

// @desc    Get all orders
// @route   POST /api/v1/orders
// @access  Protected/User-Admin-Manager

// exports.findAllOrders = factory.getAll(Order);

exports.findAllOrders=  catchAsyncError(async (req, res, next) => {
  const orders= await Order.find().sort({ createdAt: -1 })

  res.status(200).json({orders})
})

// @desc    Get all orders
// @route   POST /api/v1/orders
// @access  Protected/User-Admin-Manager
exports.findSpecificOrder = factory.getOne(Order);

// @desc    Update order paid status to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Protected/Admin-Manager
exports.updateOrderToPaid = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new AppError(
        `There is no such a order with this id:${req.params.id}`,
        404
      )
    );
  }
  // update order to paid
  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", data: updatedOrder });
});

// @desc    Update order delivered status
// @route   PUT /api/v1/orders/:id/deliver
// @access  Protected/Admin-Manager
exports.updateOrderToDelivered = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new AppError(
        `There is no such a order with this id:${req.params.id}`,
        404
      )
    );
  }

  // update order to paid
  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", data: updatedOrder });
});

// @desc    Get checkout session from stripe and send it as response
// @route   GET /api/v1/orders/checkout-session/cartId
// @access  Protected/User
exports.checkoutSession = catchAsyncError(async (req, res, next) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get cart depend on cartId
  const cart = await cartModel.findOne({user: req.user._id });
  if (!cart) {
    return next(
      new AppError(`There is no such cart with this user 404`)
    );
  }
  // 2) Get order price depend on cart price "Check if coupon apply"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // 3) Create stripe checkout session
  const stripe=Stripe(process.env.STRIPE_KEY)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'egp',
        product_data: {
          name: req.user.name,
        },
        unit_amount: totalOrderPrice * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.SUCCESS_URL}`,
    cancel_url: `${process.env.CANCEL_URL}`,
    customer_email: req.user.email,
    client_reference_id: cart._id.toString(),
    metadata: req.body.shippingAddress,
  });
 
  // 4) send session to response
  res.status(200).json({ status: 'success', session ,url:session.url});
});

const createCardOrder = async (session) => {
  const cartId = session.client_reference_id;
  const shippingAddress = session.metadata;
  const oderPrice = session.amount_total / 100;

  const cart = await cartModel.findById(cartId);
  const user = await userModel.findOne({ email: session.customer_email });
   
  // 3) Create order with default paymentMethodType card
  const order = await Order.create({
    user: user._id,
    cartItems: cart.cartItems,
    shippingAddress,
    totalOrderPrice: oderPrice,
    isPaid: true,
    paidAt: Date.now(),
    paymentMethodType: 'card',
  });
  // 4) After creating order, decrement product quantity, increment product sold
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await productModel.bulkWrite(bulkOption, {});

    // 5) Clear cart depend on cartId
    await cartModel.findByIdAndDelete(cartId);
  }
};

// @desc    This webhook will run when stripe payment success paid
// @route   POST /webhook-checkout
// @access  Protected/User
exports.webhookCheckout = catchAsyncError(async (req, res, next) => {
  const stripe=Stripe(process.env.STRIPE_KEY)
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    //  Create order
    createCardOrder(event.data.object);
    res.status(200).json({ received: true });
  }else return res.status(200).json({ received: false ,message:"rejected order"});
});

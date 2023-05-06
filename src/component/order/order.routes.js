const express = require("express");

const { protectedRoutes, allowedTo } = require("../users/user.auth");
const {
  createCashOrder,
  filterOrderForLoggedUser,
  findAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  findSpecificOrder,
  checkoutSession,
  webhookCheckout,
} = require("./order.service");

const router = express.Router();

// router.use(protectedRoutes);


router.route("/").post(allowedTo("user"), createCashOrder);
router.get(
  "/checkout-session",
  allowedTo('user'),
  checkoutSession
);
router.get(
  "/",
  allowedTo("user", "admin"),
  filterOrderForLoggedUser,
  findAllOrders
);
router.post('/webhook', express.raw({type: 'application/json'}), webhookCheckout);
router.get("/:id", findSpecificOrder);
router.put("/:id/pay", allowedTo("admin"), updateOrderToPaid);
router.put("/:id/deliver", allowedTo("admin"), updateOrderToDelivered);
module.exports = router;

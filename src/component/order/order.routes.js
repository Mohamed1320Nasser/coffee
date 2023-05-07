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

router.route("/").post(protectedRoutes,allowedTo("user"), createCashOrder);
router.post(
  "/checkout-session",
  protectedRoutes,
  allowedTo('user'),
  checkoutSession
);
router.get(
  "/",
  protectedRoutes,
  allowedTo("user", "admin"),
  filterOrderForLoggedUser,
  findAllOrders
);
router.post('/webhook', express.raw({type: 'application/json'}), webhookCheckout);
router.get("/:id", findSpecificOrder);
router.put("/:id/pay",protectedRoutes, allowedTo("admin"), updateOrderToPaid);
router.put("/:id/deliver",protectedRoutes, allowedTo("admin"), updateOrderToDelivered);
module.exports = router;

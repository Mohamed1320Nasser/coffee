const express = require("express");

const { protectedRoutes, allowedTo } = require("../users/user.auth");
const {
  createCashOrder,
  filterOrderForLoggedUser,
  findAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  findSpecificOrder,
} = require("./order.service");

const router = express.Router();

router.use(protectedRoutes);

router.route("/").post(allowedTo("user"), createCashOrder);
router.get(
  "/",
  allowedTo("user", "admin"),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get("/:id", findSpecificOrder);

router.put("/:id/pay", allowedTo("admin"), updateOrderToPaid);
router.put("/:id/deliver", allowedTo("admin"), updateOrderToDelivered);
module.exports = router;

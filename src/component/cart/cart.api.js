const { protectedRoutes, allowedTo } = require("../users/user.auth");
const {
  addProductToCart,
  removeProductFromeCart,
  updateQuantity,
  applyCoupon,
  getUserCart,
} = require("./cart.service");

const router = require("express").Router();
router
  .route("/")
  .post(protectedRoutes,addProductToCart)
  .put(protectedRoutes,updateQuantity)
  .get(protectedRoutes,getUserCart);
  router.delete("/:productId",protectedRoutes,removeProductFromeCart)
  router.post("/applyCoupon",applyCoupon)
module.exports = router;

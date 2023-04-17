const globalMiddelwearErr = require("./globalMiddelwearErr");

exports.allRequires = (app) => {
  app.use("/api/v1/categories", require("../component/category/category.api"));
  app.use("/api/v1/brands", require("../component/brand/brand.api"));
  app.use("/api/v1/products", require("../component/product/product.api"));
  app.use("/api/v1/users", require("../component/users/user.api"));
  app.use("/api/v1/machines", require("../component/Machines/Machines.routes"));
  app.use("/api/v1/reviews", require("../component/review/review.api"));
  app.use("/api/v1/wishlists", require("../component/wishlist/wishlist.api"));
  app.use("/api/v1/adresses", require("../component/address/address.api"));
  app.use("/api/v1/coupons", require("../component/coupon/coupon.api"));
  app.use("/api/v1/carts", require("../component/cart/cart.api"));
  app.use("/api/v1/orders", require("../component/order/order.routes"));


  // app.use(globalMiddelwearErr);
};

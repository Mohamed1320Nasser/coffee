const { dbConnection } = require("../dataBase/db-Connection");
const AppError = require("./AppError");
const globalMiddelwearErr = require("./globalMiddelwearErr");

exports.allRequires = (app) => {

  const morgan = require("morgan");
  // determine if devolopment or production is enabled
if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
}


  app.use("/api/v1/categories", require("../component/category/category.routes"));
  app.use("/api/v1/brands", require("../component/brand/brand.routes"));
  app.use("/api/v1/products", require("../component/product/product.api"));
  app.use("/api/v1/users", require("../component/users/user.api"));
  app.use("/api/v1/machines", require("../component/Machines/Machines.routes"));
  app.use("/api/v1/reviews", require("../component/review/review.api"));
  app.use("/api/v1/wishlists", require("../component/wishlist/wishlist.api"));
  app.use("/api/v1/adresses", require("../component/address/address.api"));
  app.use("/api/v1/coupons", require("../component/coupon/coupon.routes"));
  app.use("/api/v1/carts", require("../component/cart/cart.api"));
  app.use("/api/v1/orders", require("../component/order/order.routes"));

  //requires
app.all("*", (req, res, next) => {
  next(new AppError(`cannot get this route ${req.originalUrl} in her `, 404));
});

// Middlewares
app.use(globalMiddelwearErr);

// Connect with db
dbConnection();


  // app.use(globalMiddelwearErr);
};

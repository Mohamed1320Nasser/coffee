const { uploadSingleImage } = require("../../utils/uploadFile");
const {
  getBrands,
  creatBrand,
  getBrand,
  updBrand,
  delBrand,
} = require("./brand.services");

const router = require("express").Router();
const products = require("../product/product.api");
const { protectedRoutes, allowedTo } = require("../users/user.auth");
router.use("/:brandId/products", products);
router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "brand"),
    creatBrand
  )
  .get(getBrands);
router
  .route("/:id")
  .get(getBrand)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "brand"),
    updBrand
  )
  .delete(protectedRoutes, allowedTo("admin"), delBrand);

module.exports = router;

const {
  creatCategory,
  getCategories,
  getCategory,
  updCategory,
  deleleCategory,
} = require("./category.services");
const { uploadSingleImage } = require("../../utils/uploadFile");
const { protectedRoutes, allowedTo } = require("../users/user.auth");
const router = require("express").Router();
const products = require("../product/product.api");
router.use("/:categoryId/products", products);
router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "category"),
    creatCategory
  )
  .get(getCategories);
router
  .route("/:id/")
  .get(getCategory)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "category"),
    updCategory
  )
  .delete(protectedRoutes, allowedTo("admin"), deleleCategory);
module.exports = router;

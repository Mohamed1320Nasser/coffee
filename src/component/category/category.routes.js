const {
  creatCategory,
  getCategories,
  getCategory,
  updCategory,
  deleleCategory,
} = require("./category.services");
const { uploadSingleImage, checkImageUpload } = require("../../utils/uploadFile");
const { protectedRoutes, allowedTo } = require("../users/user.auth");
const products = require("../product/product.api");
const { validation } = require("../../utils/validation");
const validators=require('./category.validat')
const router = require("express").Router();
router.use("/:categoryId/products", products);
router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "category"),
    checkImageUpload,
    validation(validators.category),
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
  .delete( deleleCategory);
module.exports = router;

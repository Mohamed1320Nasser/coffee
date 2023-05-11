const { uploadSingleImage, checkImageUpload } = require("../../utils/uploadFile");
const { validation } = require("../../utils/validation");
const { productValidation } = require("./product.validate");
const { protectedRoutes, allowedTo } = require("../users/user.auth");
const {
  creatProduct ,
  getProducts,
  getProduct,
  updProduct,
  delProduct,
} = require("./product.services");
const router = require("express").Router({ mergeParams: true });

router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "product"),
    checkImageUpload,
    validation(productValidation),
    creatProduct
  )
  .get(getProducts);
router
  .route("/:id")
  .get(getProduct)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "product"),
    updProduct
  )
  .delete(protectedRoutes, allowedTo("admin"), delProduct);
module.exports = router;

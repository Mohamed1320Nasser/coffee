const {  uploadSingleImage } = require("../../utils/uploadFile");
const {
  creatProduct,
  getProducts,
  getProduct,
  updProduct,
  delProduct,
} = require("./product.services");
const router = require("express").Router({mergeParams:true});

router
  .route("/")
  .post( uploadSingleImage("image","product"), creatProduct)
  .get(getProducts);
router
  .route("/:id")
  .get(getProduct)
  .put( uploadSingleImage("image","product"), updProduct)
  .delete(delProduct);
module.exports = router;

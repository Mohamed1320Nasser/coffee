const {  uploadSingleImage } = require("../../utils/uploadFile");
const {
  getBrands,
  creatBrand,
  getBrand,
  updBrand,
  delBrand,
} = require("./brand.services");

const router = require("express").Router();
const products =require("../product/product.api")
router.use("/:brandId/products",products)
router.route("/").post(uploadSingleImage("image","brand"), creatBrand).get(getBrands);
router
  .route("/:id")
  .get(getBrand)
  .put(uploadSingleImage("image","brand"), updBrand)
  .delete(delBrand);

module.exports = router;

const {
  creatCategory,
  getCategories,
  getCategory,
  updCategory,
  deleleCategory,
} = require("./category.services");
const {uploadSingleImage } = require("../../utils/uploadFile");
const { protectedRoutes, allowedTo } = require("../users/user.auth");
const router = require("express").Router();
router
  .route("/")

  .post(
    uploadSingleImage("image","category"),
    creatCategory
  )
  .get(getCategories);
router
  .route("/:id/")
  .get(getCategory)
  .put(uploadSingleImage("image","category"), updCategory)
  .delete(deleleCategory);
module.exports=router;

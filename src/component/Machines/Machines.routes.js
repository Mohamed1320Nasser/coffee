const { uploadSingleImage } = require("../../utils/uploadFile");
const {
  creatMachines,
  getAllMachines,
  getMachine,
  updateMachine,
  deleteMachine,
} = require("./Machines.services");

const router = require("express").Router();
const products =require("../product/product.api")
router.use("/:machineId/products",products)
router
  .route("/")
  .post(uploadSingleImage("image", "machines"), creatMachines)
  .get(getAllMachines);
router
  .route("/:id")
  .get(getMachine)
  .put(uploadSingleImage("image", "machines"), updateMachine)
  .delete(deleteMachine);
module.exports = router;

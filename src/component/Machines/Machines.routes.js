const { uploadSingleImage, checkImageUpload } = require("../../utils/uploadFile");
const {
  creatMachines,
  getAllMachines,
  getMachine,
  updateMachine,
  deleteMachine,
} = require("./Machines.services");

const router = require("express").Router();
const products = require("../product/product.api");
const { protectedRoutes, allowedTo } = require("../users/user.auth");
const { validation } = require("../../utils/validation");
const { MachineValidation } = require("./Machines.validate");
router.use("/:machineId/products", products);
router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "machines"),
    checkImageUpload,
    validation(MachineValidation),
    creatMachines
  )
  .get(getAllMachines);
router
  .route("/:id")
  .get(getMachine)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "machines"),
    updateMachine
  )
  .delete(protectedRoutes, allowedTo("admin"), deleteMachine);
module.exports = router;

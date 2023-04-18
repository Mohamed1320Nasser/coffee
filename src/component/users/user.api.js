const { SignUp, Signin, verifyEmail, protectedRoutes } = require("./user.auth");
const { getProfile, updateProfile } = require("./user.profile");
const {
  creatUser,
  getUsers,
  getUser,
  updUser,
  delUser,
  ChangePass,
} = require("./user.service");

const router = require("express").Router();

router.route("/").post(creatUser).get(getUsers);
router.get("/verfy-email", verifyEmail);
router.route("/:id").get(getUser).put(updUser).delete(delUser);
router.patch("/changePassword/:id", ChangePass);
router.post("/signUp", SignUp);
router.post("/signin", Signin);
router
  .get("/myProfile", protectedRoutes, getProfile)
  .put("/updateProfile", protectedRoutes, updateProfile)
  .put("/changePassword", protectedRoutes, ChangePass);

module.exports = router;

const { validation } = require("../../utils/validation");
const {
  SignUp,
  Signin,
  verifyEmail,
  protectedRoutes,
  allowedTo,
  Signout,
} = require("./user.auth");
const { getProfile, updateProfile, ChangePass } = require("./user.profile");
const {
  creatUser,
  getUsers,
  getUser,
  updUser,
  delUser,
} = require("./user.service");
const { userSchema, loginSchema, changePassSchema } = require("./user.validate");

const router = require("express").Router();

router
  .route("/")
  .post(protectedRoutes, allowedTo("admin"), validation(userSchema), creatUser)
  .get(protectedRoutes, allowedTo("admin"), getUsers);
router.get("/verfy-email", verifyEmail);
router
  .route("/:id")
  .get(protectedRoutes, allowedTo("admin"), getUser)
  .put(protectedRoutes, allowedTo("admin"), updUser)
  .delete(delUser, protectedRoutes, allowedTo("admin"));

router.post("/signUp",validation(userSchema), SignUp);
router.post("/signin",validation(loginSchema), Signin);
router.post("/Signout", Signout);
router
  .get("/myProfile", protectedRoutes, getProfile)
  .put("/updateProfile", protectedRoutes, updateProfile)
  .patch("/changePassword", protectedRoutes ,validation(changePassSchema), ChangePass);

module.exports = router;

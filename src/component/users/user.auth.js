const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const { sendEmail } = require("../emails/verification.email");

//sign Up
module.exports.SignUp = catchAsyncError(async (req, res, next) => {
  const IsUser = await UserModel.findOne({ email: req.body.email });
  if (IsUser) return next(new AppError("User is already exists", 401));
  req.body.emailToken = crypto.randomBytes(16).toString("hex");
  const User = new UserModel(req.body);
  await User.save();
  sendEmail(User, req.headers.host);
  res.status(200).json("success registration please verify your email address");
});
//verify email
exports.verifyEmail = catchAsyncError(async (req, res, next) => {
  const { token } = req.query;
  const user = await UserModel.findOne({ emailToken: token });
  if (user) {
    await UserModel.findByIdAndUpdate(user._id, {
      emailToken: null,
      Isverified: true,
    });
    res.status(200).json({ message: "email verified", status: true });
  } else {
    res.status(404).json({ message: "user not found", status: false });
  }
});

//sign in
module.exports.Signin = catchAsyncError(async (req, res, next) => {
  const User = await UserModel.findOne({ email: req.body.email });
  if (!User || !(await bcrypt.compare(req.body.password, User.password)))
    return next(new AppError("incorrect email or password", 401));
  if (User.Isverified == false)
    return next(new AppError("email is not verified", 401));
  const token = jwt.sign(
    { userId: User._id, name: User.name },
    process.env.secrit_key
  );
  res.status(200).json({ token });
});
exports.Signout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token");
  const expiredToken = jwt.sign({}, process.env.secrit_key, {
    expiresIn: "10",
  });
  res.status(200).json({ message: "logged out", status: true });
});

//authentication 
exports.protectedRoutes = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next(new AppError("token inprovided", 401));
  let decoded = jwt.verify(token, process.env.secrit_key);
  const user = await UserModel.findById(decoded.userId);
  if (!user) return next(new AppError("User not found", 401));
  if (user.passwordChangeAt) {
    let changePassword = parseInt(user.passwordChangeAt.getTime() / 100);
    if (changePassword > decoded.iat)
      return next(new AppError("password changed", 401));
  }
  req.user = user;

  next();
});
//authrization {detrmind if user or admin}
exports.allowedTo = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("You don't have permission to do this", 401));
    next();
  });
};

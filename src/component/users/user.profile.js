const bcrypt=require('bcrypt')
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const { deleteFromCloudinary } = require("../../utils/cludinary");
const UserModel = require("./user.model");
exports.getProfile = catchAsyncError(async (req, res, next) => {
    const User = await UserModel.findById(req.user._id).select('name email phone image addresses role')
    if (!User) return next(new AppError("User not found", 404));
   return res.status(200).json({ User });
  })
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const UserId = req.user._id;
  if (req.file) {
    if (!req.user.cloudinary_id === "default") {
      await deleteFromCloudinary(req.user.cloudinary_id);
    }
    const result = await uploadToCloudinary(req.file, "User");
    req.body.image = result.secure_url;
    req.body.cloudinary_id = result.public_id;
    await UserModel.findByIdAndUpdate(UserId, req.body, { new: true });
    res.status(200).json({ message: "success update" });
  } else {
    await UserModel.findByIdAndUpdate(UserId, req.body, { new: true });
    res.status(200).json({ message: "success update" });
  }
});
module.exports.ChangePass = catchAsyncError(async (req, res,next) => {
  const { oldPassword, newPassword } = req.body;
  let match = await bcrypt.compare(oldPassword, req.user.password);
  if (match) {
    await UserModel.findByIdAndUpdate(req.user._id, { password: newPassword });
    res.status(200).json({ message: " change password is succes" });
  } else {
   return next(new AppError("Old password is incorrect",401))
  }
});

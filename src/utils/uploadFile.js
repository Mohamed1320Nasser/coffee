const multer = require('multer');
const AppError = require("./AppError")
const mimeTypes= require("mime-types")


let options = (folderName) => {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
   const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
   const fileMimeType = mimeTypes.lookup(file.originalname);
    if (allowedMimeTypes.includes(fileMimeType)  )  {
      cb(null, true);
    } else {
      cb(new AppError("image only", 400), false);
    }
  }
  const upload = multer({ storage, fileFilter });
  return upload;
};
exports.uploadSingleImage = (fieldName, folderName) =>
  options(folderName).single(fieldName);

exports.fileMixUpload = (fieldArry, folderName) =>
  options(folderName).fields(fieldArry);


  ////
  exports.checkImageUpload = (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    next();
  };
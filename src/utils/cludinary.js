const AppError = require("./AppError");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dufrfkj11",
  api_key: "236495523462181",
  api_secret: "QScUoMXjlODhXwKlOu3sVJRuM50",
});
exports.cloudinary = cloudinary;

exports.uploadToCloudinary = async (file, fieldName) => {

     try{
      // if(!file) throw new AppError("pleat upload image ", 401);
    if (file.size > 2100000) {
      throw new AppError("File size should be less than 2Mb", 401);
    }
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `Coffee/${fieldName}`,
      resource_type: "image",
    });
      return result;
  }catch(err){
    console.log(err);
  }
 
};
exports.deleteFromCloudinary = async (image) => {
  await cloudinary.uploader.destroy(image.cloudinary_id);
};

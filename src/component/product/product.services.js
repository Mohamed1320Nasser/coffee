const ProductModel = require("./product.model");
var slugify = require("slugify");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const facrory = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/apiFeatuares");

// to add a new Product
module.exports.creatProduct = facrory.createOne(ProductModel,"product");
// to get all Products
 module.exports.getProducts =  facrory.getAll(ProductModel);
 //catchAsyncError(async (req, res, next) => {
//   let apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
//     .paginat()
//     .filter()
//     .sort()
//     .search()
//     .fields();
//   const Product = await apiFeatures.mongooseQuery;
//   !Product && next(new AppError("Product not found", 404));
//   Product && res.status(200).json({ page: apiFeatures.page, Product });
// });

// to get specific Product
module.exports.getProduct = facrory.getOne(ProductModel);
// to delete an Product
module.exports.delProduct = facrory.deleteOn(ProductModel);


// to update Product name
module.exports.updProduct = facrory.updateOne(ProductModel)

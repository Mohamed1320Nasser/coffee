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

// to get specific Product
module.exports.getProduct = facrory.getOne(ProductModel,'category brand machine');
// to delete an Product
module.exports.delProduct = facrory.deleteOn(ProductModel);


// to update Product name
module.exports.updProduct = facrory.updateOne(ProductModel)

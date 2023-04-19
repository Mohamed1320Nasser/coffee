let slugify = require("slugify");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const ApiFeatures = require("../../utils/apiFeatuares");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../../utils/cludinary");

exports.createOne = (Model, fieldName) => {
  return catchAsyncError(async (req, res, next) => {
    const result = await uploadToCloudinary(req.file, fieldName);
    req.body.image = result.secure_url;
    req.body.cloudinary_id = result.public_id;
    req.body.slug = slugify(req.body.name);
    const document = new Model(req.body);
    await document.save();
    res.status(200).json(document);
  });
};
exports.deleteOn = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const findDocument = await Model.findById(id);
    if( !findDocument)return next(new AppError("Document not found", 404));
    await deleteFromCloudinary(findDocument);
     await Model.findByIdAndDelete(id);
    res.status(200).json("deleted");
  });
};

exports.getAll = (Model) =>
  catchAsyncError(async (req, res, next) => {
    let filter = {};
    if(req.params.categoryId) filter = {category: req.params.categoryId};
    if(req.params.machienId) filter = {machien: req.params.machienId};
    if(req.params.brandId) filter = {brand: req.params.brandId};
    let apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginat()
      .filter()
      .sort()
      .search()
      .fields();
    const Product = await apiFeatures.mongooseQuery
    !Product && next(new AppError("Product not found", 404));
    Product &&
      res.status(200).json({ page: apiFeatures.page, result: Product });
  });

exports.getOne = (Model, populationOpt) =>
  catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    // 1) Build query
    let query = Model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }
    // 2) Execute query
    const document = await query;
    if (!document) {
      return next(new AppError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.updateOne = (Model, fieldName) =>
  catchAsyncError(async (req, res, next) => {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    if (req.file) {
      const findDocument = await Model.findById(req.params.id);
      await deleteFromCloudinary(findDocument);
      const result = await uploadToCloudinary(req.file, fieldName);
      req.body.image = result.secure_url;
      req.body.cloudinary_id = result.public_id;
    }
    const obj = Object.assign({}, req.body);
    const Document = await Model.findByIdAndUpdate(req.params.id, obj, {
      new: true,
    });
    if (!Document) {
      return next(
        new AppError(`No document for this id ${req.params.id}`, 404)
      );
    }
    Document.save();
    res.status(200).json({ data: Document });
  });
  // exports.getSomeProduct=(Model,name)=>{
  //   catchAsyncError(async(req,res,next)=>{
  //     exports.getAll = (Model) =>
  // catchAsyncError(async (req, res, next) => {
  //   let apiFeatures = new ApiFeatures(Model.find({:id}), req.query)
  //     .paginat()
  //     .filter()
  //     .sort()
  //     .search()
  //     .fields();
  //   const Product = await apiFeatures.mongooseQuery
  //   !Product && next(new AppError("Product not found", 404));
  //   Product &&
  //     res.status(200).json({ page: apiFeatures.page, result: Product });
  // });
  //   });
  // }

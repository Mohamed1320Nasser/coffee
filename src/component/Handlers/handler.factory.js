let slugify = require("slugify");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const ApiFeatures = require("../../utils/apiFeatuares");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../../utils/cludinary");


// end point to craete any decument 
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

// end point to delete any decument 
exports.deleteOn = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const findDocument = await Model.findById(id);
    if (!findDocument) return next(new AppError("Document not found", 404));
    await deleteFromCloudinary(findDocument);
    await Model.findByIdAndDelete(id);
    res.status(200).json("deleted");
  });
};

// end point to get any decument  with pagination filter sort search and fielde
exports.getAll = (Model) =>
  catchAsyncError(async (req, res, next) => {
    let filter = {};
    if (req.params.categoryId) filter = { category: req.params.categoryId };
    if (req.params.machineId) filter = { machine: req.params.machineId };
    if (req.params.brandId) filter = { brand: req.params.brandId };
    let apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginat()
      .filter()
      .sort()
      .search()
      .fields();
      const numDocument = await Model.collection.count()
    let pages = numDocument / apiFeatures.limit
    pages = Math.ceil(pages)
    const Document = await apiFeatures.mongooseQuery
    !Document && next(new AppError("Document not found", 404));
    Document &&
      res.status(200).json({ page: apiFeatures.page, pages,numDocument, result: Document });
  });

  // get spcific document be his id 
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


  //update any document 
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
  

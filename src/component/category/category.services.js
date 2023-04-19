const CategoryModel = require("./category.model");
const factory = require("../Handlers/handler.factory");




// to add a new category

module.exports.creatCategory = factory.createOne(CategoryModel,"category");
// to get categories

module.exports.getCategories = factory.getAll(CategoryModel);
// to get specific category

module.exports.getCategory = factory.getOne(CategoryModel,);
// to delete an category

module.exports.deleleCategory = factory.deleteOn(CategoryModel);
// to update category name

module.exports.updCategory = factory.updateOne(CategoryModel,"category");

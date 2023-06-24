const joi = require("joi");
exports.productValidation = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().required().min(3).max(50).messages({
        "any.required": "product name field is required",
        "any.empty": "empty product name is not acceptable",
      }),
      quantity: joi.number().required().min(3).max(200).messages({
        "any.required": "product quantity field is required",
        "any.empty": "empty product quantity is not acceptable",
      }),
      description: joi.string().required().min(20).max(10000).messages({
        "any.required": "product description field is required",
        "any.empty": "empty product description is not acceptable",
      }),
      price: joi.number().required().min(0).max(10000).messages({
        "any.required": "product price field is required",
        "any.empty": "empty product price is not acceptable",
      }),
      priceAfterDiscount: joi.number().required().min(0).max(10000).messages({
        "any.required": "product price After Discount field is required",
        "any.empty": "empty product price After Discount is not acceptable",
      }),
      countryOfOrigin: joi.string().required().min(3).max(100).messages({
        "any.required": "product country Of Origin field is required",
        "any.empty": "empty product country Of Origin is not acceptable",
      }),
      category: joi.string().hex().length(24).messages({
        "any.required": "product categoryId Of Origin field is required",
        "any.empty": "empty product categoryId Of Origin is not acceptable",
      }),
      brand: joi.string().hex().length(24).messages({
        "any.required": "product brand  field is required",
        "any.empty": "empty product brand  is not acceptable",
      }),
      machine: joi.string().hex().length(24).messages({
        "any.required": "product machien  field is required",
        "any.empty": "empty product machien is not acceptable",
      }),
    }),
    image: joi.binary().max(5000000).required()
    .messages({
      "any.required": "product image field is required",
      "any.empty": "empty product image is not acceptable",
      "binary.max": "product image size must be less than 5 MB"
    })
};

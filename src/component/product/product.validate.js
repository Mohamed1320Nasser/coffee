const joi = require("joi");
exports.productValidation = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().required().min(3).max(10).messages({
        "any.required": "product name field is required",
        "any.empty": "empty product name is not acceptable",
      }),
      quantity: joi.number().required().min(3).max(10).messages({
        "any.required": "product quantity field is required",
        "any.empty": "empty product quantity is not acceptable",
      }),
      description: joi.string().required().min(30).max(10000).messages({
        "any.required": "product description field is required",
        "any.empty": "empty product description is not acceptable",
      }),
      price: joi.number().required().min(0).max(1000).messages({
        "any.required": "product price field is required",
        "any.empty": "empty product price is not acceptable",
      }),
      priceAfterDiscount: joi.number().required().min(0).max(1000).messages({
        "any.required": "product price After Discount field is required",
        "any.empty": "empty product price After Discount is not acceptable",
      }),
      countryOfOrigin: joi.string().required().min(30).max(70).messages({
        "any.required": "product country Of Origin field is required",
        "any.empty": "empty product country Of Origin is not acceptable",
      }),
    }),
};

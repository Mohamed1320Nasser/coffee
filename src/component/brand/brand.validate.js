const joi = require("joi");
exports.brandValidation = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi
        .string()
        .required()
        .min(3)
        .max(15)
        .messages({
          "any.required": "brand name field is required",
          "any.empty": "empty brand  name is not acceptable",
        }),
    }),
  image: joi.binary().max(5000000).required()
    .messages({
      "any.required": "brand image field is required",
      "any.empty": "empty brand image is not acceptable",
      "binary.max": "brand image size must be less than 5 MB"
    })
};

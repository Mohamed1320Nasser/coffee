const joi = require("joi");
exports.category = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().required().min(2).max(50).messages({
        "any.required": "category name field is required",
        "any.empty": "category brand  name is not acceptable",
      }),
    }),
    image: joi.binary().max(5000000).required()
    .messages({
      "any.required": "category image field is required",
      "any.empty": "empty category image is not acceptable",
      "binary.max": "category image size must be less than 5 MB"
    })
};

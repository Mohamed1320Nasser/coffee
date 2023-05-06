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
};

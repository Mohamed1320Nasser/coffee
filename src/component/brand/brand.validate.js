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
};

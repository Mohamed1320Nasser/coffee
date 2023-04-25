const joi = require("joi");
exports.MachineValidation = {
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
          "any.required": "Machine name field is required",
          "any.empty": "empty Machine  name is not acceptable",
        }),
        type: joi
        .string()
        .required()
        .min(3)
        .max(10)
        .messages({
          "any.required": "Machine name field is required",
          "any.empty": "empty Machine  name is not acceptable",
        }),
        description: joi
        .string()
        .required()
        .min(3)
        .max(50)
        .messages({
          "any.required": "Machine description field is required",
          "any.empty": "empty Machine  description is not acceptable",
        }),
        pros: joi
        .string()
        .required()
        .min(3)
        .max(20)
        .messages({
          "any.required": "Machine pros field is required",
          "any.empty": "empty Machine  pros is not acceptable",
        }),
        cons: joi
        .string()
        .required()
        .min(3)
        .max(20)
        .messages({
          "any.required": "Machine cons field is required",
          "any.empty": "empty Machine  cons is not acceptable",
        }),
    }),
};
import joi from "joi";

export const addressSchema = joi.object({
    street: joi.string().required().trim(),
    number: joi.number().required(),
    zipCode: joi
        .string()
        .length(8)
        .pattern(/^[0-9]+$/)
        .required(),
    complement: joi.string().trim(),
    district: joi.string().required().trim(),
    reference: joi.string().trim(),
});

import joi from "joi";
import { addressSchema } from "@/schemas";

export const customerSchema = joi.object({
    name: joi.string().required().trim(),
    cpf: joi
        .string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    phone: joi
        .string()
        .required()
        .min(10)
        .max(11)
        .pattern(/^[0-9]+$/),
    birthDate: joi.date().required(),
    address: addressSchema,
});

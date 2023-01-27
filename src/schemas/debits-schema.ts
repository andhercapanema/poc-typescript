import { DebitCreateInput } from "@/Protocols";
import joi from "joi";

export const debitSchema = joi.object<DebitCreateInput>({
    customerId: joi.number().required(),
    value: joi.number().required(),
    dueAt: joi.date(),
});

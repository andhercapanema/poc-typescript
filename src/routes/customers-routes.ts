import {
    deleteCustomerById,
    getAllCustomers,
    getCustomerById,
    patchCustomerById,
    postNewCustomer,
} from "@/controllers";
import { validateBody } from "@/middlewares";
import { customerSchema, customerWithAddressSchema } from "@/schemas";
import { Router } from "express";

const customerRouter = Router();
customerRouter
    .get("", getAllCustomers)
    .get("/:id", getCustomerById)
    .delete("/:id", deleteCustomerById)
    .post("", validateBody(customerWithAddressSchema), postNewCustomer)
    .patch("/:id", validateBody(customerSchema), patchCustomerById);

export default customerRouter;

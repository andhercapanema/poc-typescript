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

const router = Router();
router.get("", getAllCustomers);
router.get("/:id", getCustomerById);
router.delete("/:id", deleteCustomerById);

router.post("", validateBody(customerWithAddressSchema), postNewCustomer);
router.patch("/:id", validateBody(customerSchema), patchCustomerById);

export default router;

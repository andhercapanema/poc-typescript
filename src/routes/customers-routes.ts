import {
    deleteCustomerById,
    getAllCustomers,
    getCustomerById,
    patchCustomerById,
    postNewCustomer,
} from "@/controllers";
import { validateBody } from "@/middlewares";
import { customerSchema } from "@/schemas";
import { Router } from "express";

const router = Router();
router.get("", getAllCustomers);
router.get("/:id", getCustomerById);
router.delete("/:id", deleteCustomerById);

router.use(validateBody(customerSchema));
router.post("", postNewCustomer);
router.patch("/:id", patchCustomerById);

export default router;

import { Router } from "express";
import {
    deleteCustomerById,
    getAllCustomers,
    getCustomerById,
    patchCustomerById,
    postNewCustomer,
} from "../controllers/customers-controller.js";
import { validateBody } from "../middlewares/validation-middleware.js";
import { customerSchema } from "../schemas/customer-schema.js";

const router = Router();
router.get("", getAllCustomers);
router.get("/:id", getCustomerById);
router.delete("/:id", deleteCustomerById);

router.use(validateBody(customerSchema));
router.post("", postNewCustomer);
router.patch("/:id", patchCustomerById);

export default router;

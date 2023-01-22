import { Router } from "express";
import {
    getAllCustomers,
    postNewCustomer,
} from "../controllers/customers-controller.js";
import { validateBody } from "../middlewares/validation-middleware.js";
import { customerSchema } from "../schemas/customer-schema.js";

const router = Router();
router.post("", validateBody(customerSchema), postNewCustomer);
router.get("", getAllCustomers);

export default router;

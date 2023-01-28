import { getDebits, postNewDebit } from "@/controllers";
import { validateBody } from "@/middlewares";
import { debitSchema } from "@/schemas";
import { Router } from "express";

const router = Router();
router.get("/", getDebits).post("/", validateBody(debitSchema), postNewDebit);

export default router;

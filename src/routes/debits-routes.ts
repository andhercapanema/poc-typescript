import { getDebits, payDebit, postNewDebit } from "@/controllers";
import { validateBody } from "@/middlewares";
import { debitSchema, payDebitSchema } from "@/schemas";
import { Router } from "express";

const debitsRouter = Router();
debitsRouter
    .get("/", getDebits)
    .post("/", validateBody(debitSchema), postNewDebit)
    .patch("/pay", validateBody(payDebitSchema), payDebit);

export default debitsRouter;

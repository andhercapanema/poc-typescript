import { getCepData, patchAddress } from "@/controllers";
import { validateBody } from "@/middlewares";
import { addressSchema } from "@/schemas";
import { Router } from "express";

const addressesRouter = Router();
addressesRouter
    .get("/cep/:cep", getCepData)
    .patch("/:id", validateBody(addressSchema), patchAddress);

export default addressesRouter;

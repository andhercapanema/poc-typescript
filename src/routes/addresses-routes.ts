import { getCepData, patchAddress } from "@/controllers";
import { Router } from "express";

const addressesRouter = Router();
addressesRouter.get("/cep/:cep", getCepData).patch("/:id", patchAddress);

export default addressesRouter;

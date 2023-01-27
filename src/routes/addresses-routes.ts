import { getCepData, patchAddress } from "@/controllers";
import { Router } from "express";

const router = Router();
router.get("/:cep", getCepData);
router.patch("/:id", patchAddress);

export default router;

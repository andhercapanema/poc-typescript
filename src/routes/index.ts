import { Router } from "express";
import customerRouter from "./customers-routes.js";

const router = Router();
router.use("/customers", customerRouter);

export default router;

import { handleApplicationErrors } from "@/middlewares";
import { Router } from "express";
import customerRouter from "./customers-routes";

const router = Router();
router.use("/customers", customerRouter).use(handleApplicationErrors);

export default router;

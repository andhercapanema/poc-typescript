import { handleApplicationErrors } from "@/middlewares";
import { Router } from "express";
import customerRouter from "./customers-routes";
import addressesRouter from "./addresses-routes";
import debitsRouter from "./debits-routes";

const router = Router();
router
    .use("/customers", customerRouter)
    .use("/addresses", addressesRouter)
    .use("/debits", debitsRouter)
    .use(handleApplicationErrors);

export default router;

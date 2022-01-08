import { Router } from "express";
import BalanceRouter from "./balance.js";

const router = Router();

router.use("/balance", BalanceRouter);

export default router;

import { Router } from "express";
import { BalanceController } from "../controllers/index.js";

const router = Router();

router.get("/:userId", BalanceController.getBalanceFromUserId);

export default router;

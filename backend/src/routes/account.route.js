import { Router } from "express";
import { authenticateJWT } from "../middilewares/auth.middleware.js";
import { getBalance, transferFund, getTransactionHistory } from "../controllers/account.controller.js";

const router = Router();

router.get("/balance", authenticateJWT, getBalance);
router.post("/transfer", authenticateJWT, transferFund);
router.get("/transaction", authenticateJWT, getTransactionHistory)

export default router;
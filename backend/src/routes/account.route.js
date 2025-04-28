import { Router } from "express";
import { Transaction } from "../models/transaction.model.js";
import { authenticateJWT } from "../middilewares/auth.middleware.js";
import { paginate } from "../middilewares/pagination.middleware.js";
import { setTransactionFilter } from "../middilewares/setTransactionFilter.middleware.js";
import {
    getBalance,
    transferFund,
    getTransactionHistory,
    getTransactionDetails,
} from "../controllers/account.controller.js";

const router = Router();

router.get("/balance", authenticateJWT, getBalance);
router.post("/transfer", authenticateJWT, transferFund);
router.get(
    "/transaction/:transactionId",
    authenticateJWT,
    getTransactionDetails
);
router.get(
    "/transactions",
    authenticateJWT,
    setTransactionFilter,
    paginate(Transaction),
    getTransactionHistory
);

export default router;

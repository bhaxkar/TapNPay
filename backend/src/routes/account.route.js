import { Router } from "express";
import { authenticateJWT } from "../middilewares/auth.middleware.js";
import { getBalance, transferFund } from "../controllers/account.controller.js";

const router = Router();

router.get("/balance", authenticateJWT, getBalance);
router.post("/transfer", authenticateJWT, transferFund);

export default router;
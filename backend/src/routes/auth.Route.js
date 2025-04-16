import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { authenticateJWT } from "../middilewares/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("logout", authenticateJWT, logout);

export default router;
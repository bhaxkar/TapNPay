import { Router } from "express";
import { signup, login, updateUserProfile, getUsers, validateAuth } from "../controllers/user.controller.js";
import { authenticateJWT } from "../middilewares/auth.middleware.js"


const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", authenticateJWT, getUsers);
router.get("/me", authenticateJWT, validateAuth);
router.put("/update-profile", authenticateJWT, updateUserProfile);

export default router;
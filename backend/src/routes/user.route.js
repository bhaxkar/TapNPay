import { Router } from "express";
import { signup, login, updateProfile, filteredUsers } from "../controllers/user.controller.js";
import { authenticateJWT } from "../middilewares/auth.middleware.js"


const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/update-profile", authenticateJWT, updateProfile);
router.get("/search", filteredUsers);

export default router;
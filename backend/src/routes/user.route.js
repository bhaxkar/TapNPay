import { Router } from "express";
import { User } from "../models/user.model.js";
import { authenticateJWT } from "../middilewares/auth.middleware.js";
import { paginate } from "../middilewares/pagination.middleware.js";
import { setUserSearchFilter } from "../middilewares/setUserSearchFilter.middleware.js";
import {
  signup,
  login,
  updateUserProfile,
  getUsers,
  getLoggedInUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get(
  "/users",
  authenticateJWT,
  setUserSearchFilter,
  paginate(User),
  getUsers
);
router.get("/me", authenticateJWT, getLoggedInUser);
router.put("/update", authenticateJWT, updateUserProfile);

export default router;

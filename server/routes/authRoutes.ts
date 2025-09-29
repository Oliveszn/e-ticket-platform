import express from "express";
import {
  registerWithClerk,
  resgiterUser,
  loginUser,
  refreshTokenUser,
  changePassword,
  logoutUser,
  getMe,
} from "../controllers/authContoller";
import requireAuth from "../middleware/auth";
import { authLimiter } from "../middleware/rateLimit";

const router = express.Router();

router.post("/register", authLimiter, resgiterUser);
router.post("/register/clerk", registerWithClerk);
router.post("/login", authLimiter, loginUser);
router.post("/logout", logoutUser);
router.patch("/change/password", requireAuth, changePassword);
router.post("/refresh-token", refreshTokenUser);
router.get("/me", requireAuth, getMe);

export default router;

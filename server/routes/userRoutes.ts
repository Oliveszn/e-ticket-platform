import express from "express";
import {
  getProfile,
  editProfile,
  deleteAccount,
} from "../controllers/userController";
import requireAuth from "../middleware/auth";

const router = express.Router();

router.get("/profile", requireAuth, getProfile);
router.put("/edit", requireAuth, editProfile);
router.delete("/delete", requireAuth, deleteAccount);

export default router;

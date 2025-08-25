import express from "express";
import {
  registerWithClerk,
  resgiterUser,
  loginUser,
  refreshTokenUser,
  changePassword,
  logoutUser,
} from "../controllers/authContoller";
import requireAuth from "../middleware/auth";

const router = express.Router();

router.post("/register", resgiterUser);
router.post("/register/clerk", registerWithClerk);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/change/password", requireAuth, changePassword);
router.post("/refresh-token", refreshTokenUser);

router.get("/checkAuth", (req, res) => {
  const user = req.user;
  if (user) {
    return res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user,
    });
  }
  res.status(200).json({
    success: false,
    message: "No user authenticated",
  });
});

export default router;

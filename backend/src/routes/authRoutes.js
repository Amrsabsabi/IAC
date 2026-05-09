import express from "express";
import {
  register,
  login,
  sendOtp,
  verifyOtp,
  makeAdmin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// مؤقت فقط للتطوير، لاحقاً نحذفها أو نحميها
router.post("/make-admin", makeAdmin);

export default router;
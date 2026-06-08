const express = require("express");

const {
  register,
  login,
  getProfile,
  verifyOtp,
  resendOtp,
} = require("../controllers/authController");

const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
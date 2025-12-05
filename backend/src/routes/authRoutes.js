import express from "express";
import {
  register,
  login,
  googleAuth,
  getMe,
} from "../controller/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/me", authenticate, getMe);

export default router;

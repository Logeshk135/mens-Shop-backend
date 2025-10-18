import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Get all users - admin only
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // no passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

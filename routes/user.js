import express from "express";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// Get all users - admin only
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // no passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET logged-in user's profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATE user profile
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const { name, phone, gender } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, gender },
      { new: true }
    ).select("-password");
    res.json(updated);
  } catch (err) {
    console.error("❌ Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

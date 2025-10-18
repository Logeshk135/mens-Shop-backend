import express from "express";
import User from "../models/User.js";
import Contact from "../models/Contact.js";
import auth from "../middleware/auth.js";
import adminOnly from "../middleware/admin.js";
import verifyAdmin from "../middleware/verifyAdmin.js"; // checks token + role === 'admin'

const router = express.Router();

// ✅ Get all users (admin only)
router.get("/users", auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all contact messages (admin only)
router.get("/contacts", verifyAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

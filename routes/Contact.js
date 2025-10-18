import express from "express";
import Contact from "../models/Contact.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

// POST /api/contact - user sends a message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/contact - admin fetches all messages
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

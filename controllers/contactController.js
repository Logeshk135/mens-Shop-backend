import Contact from "../models/Contact.js";

// POST /api/contact  -> save user message
export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message, date: new Date() });
    await newContact.save();
    res.status(201).json({ message: "Message sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/contact  -> admin fetch all messages
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/contact/:id  -> admin delete message
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

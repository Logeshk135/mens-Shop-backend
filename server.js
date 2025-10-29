import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/Contact.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Health check route (for Render)
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

connectDB(process.env.MONGO_URI);


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

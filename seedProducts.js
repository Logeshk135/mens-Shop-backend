import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  { name: "Casual Shirt", price: 1200, image: "/images/casual.jpg", category: "Shirt" },
  { name: "Formal Pant", price: 1500, image: "/images/formal.jpg", category: "Pant" },
  { name: "Leather Belt", price: 800, image: "/images/belt.jpg", category: "Belt" },
];

(async () => {
  await connectDB(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("✅ Seed done");
  process.exit();
})();

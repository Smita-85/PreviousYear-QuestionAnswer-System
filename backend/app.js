// backend/app.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

//admin creation
const ensureAdminExists = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log("❌ Admin email/password not set in .env");
      return;
    }

    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      // Create admin if not found
      adminUser = await User.create({
        username: "Admin",
        email: adminEmail,
        password: adminPassword,  // plain text, hook will hash
      });
      console.log("✅ Admin user created automatically");
    } else {
      // Update password if it doesn't match
      const isMatch = await bcrypt.compare(adminPassword, adminUser.password);
      if (!isMatch) {
        adminUser.password = adminPassword; // plain text
        await adminUser.save();             // hook will hash
        console.log("🔄 Admin password updated from .env");
      } else {
        console.log("⚠️ Admin already exists and is up-to-date");
      }
    }
  } catch (error) {
    console.error("❌ Error ensuring admin:", error);
  }
};

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await ensureAdminExists(); 
  })
  .catch(err => console.error("❌ MongoDB Error:", err));

export default app;

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// student routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;


/*LEARNINGS
express.Router() → allows us to define routes separately.
POST /register → register new user.
POST /login → login existing user
*/
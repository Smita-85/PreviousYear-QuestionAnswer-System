import express from "express";
import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from "../controllers/questionController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
const router = express.Router();

// Student can fetch
router.get("/", protect, getQuestions);
// Admin-only routes
router.post("/", protect, adminOnly, addQuestion);
router.put("/:id", protect, adminOnly, updateQuestion);
router.delete("/:id", protect, adminOnly, deleteQuestion);
export default router;

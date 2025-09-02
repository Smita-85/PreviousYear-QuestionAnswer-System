import Question from "../models/Question.js";

// @desc   Get questions with optional filters (Student side)
// @route  GET /api/questions?year=2023&subject=Math
// @access Student (logged in)
export const getQuestions = async (req, res) => {
  try {
    const { year, subject } = req.query;
    let filter = {};

    if (year) filter.year = year;
    if (subject) filter.subject = { $regex: subject, $options: "i" }; // case-insensitive search

    const questions = await Question.find(filter).sort({ year: -1 });
    res.json(questions);
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Add a new question (Admin only)
// @route  POST /api/questions
// @access Admin
export const addQuestion = async (req, res) => {
  try {
    const { year, subject, questionText, answerText } = req.body;

    if (!year || !subject || !questionText || !answerText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const question = new Question({ year, subject, questionText, answerText });
    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("❌ Error adding question:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update a question (Admin only)
// @route  PUT /api/questions/:id
// @access Admin
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Question.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error("❌ Error updating question:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Delete a question (Admin only)
// @route  DELETE /api/questions/:id
// @access Admin
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Question.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ message: "✅ Question deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting question:", error);
    res.status(500).json({ message: "Server error" });
  }
};



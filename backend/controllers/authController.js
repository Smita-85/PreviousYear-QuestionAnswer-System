import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//register user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//login user
/*export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
}
catch(error)
{
    res.status(500).json({message:"server error"});
}
};*/
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔎 Login attempt:", email, password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found for this email");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("✅ User found:", user.email);
    console.log("Stored hash:", user.password);

    const isMatch = await user.matchPassword(password);
    console.log("Password match:", isMatch);

    if (isMatch) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("⚠️ Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



/*LEARNINGS

1-Extract email & password from body.2-Find user by email.
-If user exists and password matches → return user info + token.
-Else → return error.

2-Get username, email, password from the request body.
-Check if a user with that email already exists. If yes, return error.
-If not, create a new user. (Password will be hashed automatically because of our pre-save hook.)
-Return newly created user info along with a JWT token.

*/
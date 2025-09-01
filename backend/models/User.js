import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//Hash the password before saving it(so that the passwords are not stored in norma text formats)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//created a User model from schema & export it.
const User = mongoose.model("User", userSchema);
export default User;

/*LEARNINGS
1-mongoose → allows us to define schemas & interact with MongoDB.
  bcryptjs → library for hashing passwords (so they aren’t stored in plain text).

2-We define a schema for users:
  username → must be unique & required
  email → must be unique & required
  password → required
  { timestamps: true } → automatically adds createdAt & updatedAt fields.

3-This is a pre-save hook → runs before saving user to DB.
  If password field is modified, we hash it using bcrypt so it’s stored securely.

*/
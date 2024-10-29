import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, requried: true },
});

export const User = mongoose.model("User", userSchema);

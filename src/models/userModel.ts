import mongoose from "mongoose";

// IMPORTANT!!
// Always restart the project from the terminal,
// so that the data saves in the designated COLLECTTION

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    courses: {
      type: [String]
    },
    subscription: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model("User", userSchema, "users");

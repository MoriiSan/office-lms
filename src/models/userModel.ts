import mongoose from "mongoose";

// IMPORTANT!!
// Always restart the project from the terminal;
// when creating or editing a schema/model
// so that the data saves in the designated COLLECTION

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists."],
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    isSSO: {
      type: Boolean,
      default: false,
    },
    courses: {
      type: [String],
    },
    subscription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const collectionName = "studentUsers";

export default mongoose.models.User ||
  mongoose.model("User", userSchema, collectionName);

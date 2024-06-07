import mongoose from "mongoose";

// IMPORTANT!!
// Always restart the project from the terminal;
// when creating or editing a schema/model
// so that the data saves in the designated COLLECTTION

const SSOSchema = new mongoose.Schema(
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
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const collectionName = "studentSSO"

export default mongoose.models.SSO_User || mongoose.model("SSO_User", SSOSchema, collectionName);

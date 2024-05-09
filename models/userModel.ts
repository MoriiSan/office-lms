import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Must provide a name."],
    },
    email: {
      type: String,
      required: [true, "Must provide an email."],
      unique: [true, "Must be unique"],
    },
    password: {
      type: String,
      required: [true, "Must provide a password."],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
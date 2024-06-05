import mongoose from "mongoose";

// IMPORTANT!!
// Always restart the project from the terminal;
// when creating or editing a schema/model
// so that the data saves in the designated COLLECTTION

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
});

const courseSchema = new mongoose.Schema(
  {
    instructorId: {
      type: String,
      required: [true, "Author is required."],
    },
    title: {
      type: String,
      required: [true, "Title must not be empty."],
    },
    courseCode: {
      type: String,
      required: [true, "Course Code must not be empty."],
      unique: [true, "Course Code must be unique."],
    },
    description: {
      type: String,
      required: [true, "Description must not be empty."],
    },
    students: {
      type: [String]
    },
    modules: {
      type: [moduleSchema],
    },
    imageThumbnail: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      required: [true, "Must be unpublished at default."],
    },
    category: {
      type: [String],
    },
    price: {
      type: Number,
      required: [true, "Zero value at default."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Course ||
  mongoose.model("Course", courseSchema, "courses");

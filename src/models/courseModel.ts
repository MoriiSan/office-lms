import { Schema, Model, model, models, ObjectId } from "mongoose";
import { IModule } from "./ModuleModel";
import { IInstructor } from "./instructorModel";

// IMPORTANT!!
// Always restart the project from the terminal;
// when creating or editing a schema/model
// so that the data saves in the designated COLLECTTION

interface ICourse {
  _id: ObjectId;
  instructor: IInstructor;
  courseCode: string;
  title: string;
  description: string;
  students: string[];
  modules: IModule[];
  imageThumbnail: string;
  isPublished: boolean;
  category: string[];
  subscriptionType: "Free" | "Basic" | "Premium";
  quizzes: string;
}

type CourseModel = Model<ICourse>;

const courseSchema: Schema = new Schema<ICourse, CourseModel>(
  {
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    courseCode: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
    imageThumbnail: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    category: {
      type: [String],
    },
    subscriptionType: {
      type: String,
      enum: ["Free", "Basic", "Premmium"],
      default: "Free",
      required: true,
    },
    quizzes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Course: CourseModel =
  models?.Course || model<ICourse, CourseModel>("Course", courseSchema);
export type { ICourse };
export { Course, courseSchema };

// const collectionName = "courses";
// export default mongoose.models.Course ||
//   mongoose.model("Course", courseSchema, collectionName);

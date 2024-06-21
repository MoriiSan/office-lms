import { Schema, Model, model, models, ObjectId } from "mongoose";
import { ICourse } from "./courseModel";

// IMPORTANT!!
// Always restart the project from the terminal;
// when creating or editing a schema/model
// so that the data saves in the designated COLLECTION

interface IStudent {
  _id: ObjectId;
  stripeId: string;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  isSSO: boolean;
  courses: ICourse[];
  subscriptionTier: "Free" | "Pro";
}

type StudentModel = Model<IStudent>;

const studentSchema: Schema = new Schema<IStudent, StudentModel>(
  {
    stripeId: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    password: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    isSSO: {
      type: Boolean,
      default: false,
    },
    courses: {
      type: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    },
    subscriptionTier: {
      type: String,
      enum: ["Free", "Pro"],
      default: "Free",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student: StudentModel =
  models?.Student || model<IStudent, StudentModel>("Student", studentSchema);

export type { IStudent };
export { Student, studentSchema };

// const collectionName = "adminUsers";
// export default mongoose.models.User ||
//   mongoose.model("User", userSchema, collectionName);

import { Schema, Model, model, models, ObjectId } from "mongoose";
import { ICourse } from "./courseModel";

// IMPORTANT!!
// Always restart the project from the terminal;
// when creating or editing a schema/model
// so that the data saves in the designated COLLECTION

interface IInstructor {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  isSSO: boolean;
}

type InstructorModel = Model<IInstructor>;

const instructorSchema: Schema = new Schema<IInstructor, InstructorModel>(
  {
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
  },
  {
    timestamps: true,
  }
);

const Instructor: InstructorModel =
  models?.Instructor ||
  model<IInstructor, InstructorModel>("Instructor", instructorSchema);

export type { IInstructor };
export { Instructor, instructorSchema };

// const collectionName = "adminUsers";
// export default mongoose.models.User ||
//   mongoose.model("User", userSchema, collectionName);

import { model, Model, models, ObjectId, Schema, Types } from "mongoose";
import { ICourse } from "./courseModel";

// IMPORTANT!!
// Always restart the project from the terminal;
// when creating or editing a schema/model
// so that the data saves in the designated COLLECTTION

interface IModule {
  _id: ObjectId;
  course: ICourse;
  title: string;
  content: string;
  description: string;
  isPublished: boolean;
  position: number;
}

type ModuleModel = Model<IModule>;

const moduleSchema: Schema = new Schema<IModule, ModuleModel>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  isPublished: {
    type: Boolean,
  },
  position: Number,
});

const Module: ModuleModel =
  models?.Module || model<IModule, ModuleModel>("Module", moduleSchema);

export type { IModule };
export { Module, moduleSchema };

// const collectionName = "modules";
// export default mongoose.models.Course ||
//   mongoose.model("Course", moduleSchema, collectionName);

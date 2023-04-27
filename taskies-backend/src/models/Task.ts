import { Schema, model, Document } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  creator: { email: string; id: string };
  date: Date;
}
const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: Object,
    required: true,
  },
  date: { type: Date, default: Date.now },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = model<ITask>("Task", taskSchema);

export default Task;

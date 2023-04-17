import { Schema, model, Document } from "mongoose";

interface ITask extends Document {
  description: string;
  completed: boolean;
  createdAt: Date;
}
const taskSchema = new Schema<ITask>({
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

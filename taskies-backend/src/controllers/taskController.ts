import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Task from "../models/Task";
import pick from "lodash/pick";
import { inAppNotification } from "../novu";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json(allTasks);
  } catch (err) {
    res.status(409).json({ message: err });
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, completed, createdAt, date } = req.body;

  if (!req.user) return res.sendStatus(403);

  const user = pick(req.user, ["email", "id"]);

  // Create a new user
  const newTask = new Task({
    title,
    description,
    completed,
    createdAt,
    creator: user,
    date,
  });
  try {
    await newTask.save();

    await inAppNotification(title, description, newTask.creator.id);

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: _id } = req.params;
  const task = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No Task is available with id: ${_id}`);
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      { ...task, _id },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    next();
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No Task is available with id: ${_id}`);
  }
  await Task.findByIdAndRemove(_id);
  res.json({ message: "Task deleted successfully" });
};

// const sendSmsNotification = async (req: Request, res: Response) => {
//   const { title, description, phone, taskId } = req.body
//   await sendSmsNotification()
// }

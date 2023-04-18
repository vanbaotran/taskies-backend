import { Request, Response } from "express";
import Task from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { description, completed, createdAt } = req.body;

    // Create a new user
    const task = new Task({ description, completed, createdAt });
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

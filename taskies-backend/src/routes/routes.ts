import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";
import { createTask, updateTask } from "../controllers/taskController";
import { signIn, signUp } from "../controllers/userController";
import { authenticateToken } from "../middleware/authenticateToken";

const express = require("express");

const router = express.Router();

const fetchTasksFromDatabase = () => [];
const deleteTaskFromDatabase = (taskId: string): void => {};

// Define your API routes and route handlers below
// For example:git remote add origin git@github.com:vanbaotran/taskies-backend.git
router.get(
  "/tasks",
  authenticateToken,
  (req: Request, res: Response, next: NextFunction) => {
    // Handle get tasks logic
    const user = req.user;
    console.log("USER", user);
    const tasks = fetchTasksFromDatabase();
    res.json(tasks);
  }
);

router.post("/signup", (req: Request, res: Response) => signUp(req, res));

router.post("/signin", (req: Request, res: Response) => signIn(req, res));

router.post(
  "/tasks",
  authenticateToken,
  (req: Request, res: Response, next: NextFunction) =>
    createTask(req, res, next)
);

router.put(
  "/tasks/:id",
  authenticateToken,
  (req: Request, res: Response, next: NextFunction) => {
    updateTask(req, res, next);
  }
);

router.delete(
  "/task/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    deleteTaskFromDatabase(taskId);
    res.json({ message: "Task deleted successfully" });
  }
);

module.exports = router;

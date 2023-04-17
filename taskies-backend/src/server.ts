import express, { Request, Response, NextFunction } from "express";
import connectDB from "./db";
const app = express();

const fetchTasksFromDatabase = () => [];
const insertNewTaskIntoDatabase = (newTask: string): void => {};
const updateTaskInDatabase = (taskId: string, updatedTask: string): void => {};
const deleteTaskFromDatabase = (taskId: string): void => {};

//connect to MongoDB
// Call connectDB to establish MongoDB connection
connectDB();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for handling CORS (if needed)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace '*' with your allowed domain(s)
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Define your API routes and route handlers below
// For example:
app.get("/tasks", (req: Request, res: Response, next: NextFunction) => {
  // Handle get tasks logic
  const tasks = fetchTasksFromDatabase();
  res.json(tasks);
});

app.post("/tasks", (req: Request, res: Response, next: NextFunction) => {
  // Handle create task logic
  const newTask = req.body;
  insertNewTaskIntoDatabase(newTask);
  res.json({ message: "Task created successfully" });
});

app.put("/tasks/:id", (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  updateTaskInDatabase(taskId, updatedTask);
  res.json({ message: "Task updated successfully!" });
});

app.delete("/task/:id", (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id;
  deleteTaskFromDatabase(taskId);
  res.json({ message: "Task deleted successfully" });
});
// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

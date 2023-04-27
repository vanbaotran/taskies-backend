import express, { Request, Response, NextFunction } from "express";
import { IUser } from "./models/User";
import { JwtPayload } from "jsonwebtoken";
import connectDB from "./db";
const app = express();
const routes = require("./routes/routes");
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
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

app.use("/api", routes);

// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

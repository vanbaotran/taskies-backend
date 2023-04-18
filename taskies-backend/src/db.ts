import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoString || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error(
      "Failed to connect to MongoDB:",
      error,
      "mongoString DTB",
      mongoString
    );
  }
};

export default connectDB;

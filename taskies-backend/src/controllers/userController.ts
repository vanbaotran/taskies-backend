import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

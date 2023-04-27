import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

require("dotenv").config();

export const signUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "Password and confirm password should match!" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.ACCESS_TOKEN_SECRET || "secret",
      {
        expiresIn: "5h",
      }
    );

    req.headers.authorization = "Bearer " + token;

    res.status(200).json({ result, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong, try again!" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "User does not exist!" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password, try again!" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.ACCESS_TOKEN_SECRET || "secret",
      { expiresIn: "5h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong!! please try again" });
  }
};

export const logOut = async (req: Request, res: Response) => {};

import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "../models/userModel";
import { comparePassword, hashPassword } from "../utils/hash";
dotenv.config();

const SECRET = process.env.JWT_SECRET || "secret";
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export async function register(req: Request, res: Response): Promise<Response> {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, username, and password are required",
      });
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const userId = await createUser(name, username, hashedPassword);

    const token = jwt.sign({ user_id: userId, username: username }, SECRET, {
      expiresIn: EXPIRES_IN,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: { user_id: userId, name, username },
    });
  } catch (error: any) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, and password are required",
      });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const comparedPassword = await comparePassword(password, user.password);
    if (!comparedPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      SECRET,
      { expiresIn: EXPIRES_IN }
    );
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { user_id: user.user_id, name: user.name, username: user.username },
    });
  } catch (error: any) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

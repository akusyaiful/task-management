import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();

const SECRET = process.env.JWT_SECRET || "secret";

export interface AuthRequest extends Request {
  user?: { user_id: number; username: string };
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Authorization token is required" });

  try {
    const payload = jwt.verify(token, SECRET) as JwtPayload;
    if (!payload || !payload.user_id || !payload.username) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token payload" });
    }

    req.user = { user_id: payload.user_id, username: payload.username };
    return next();
  } catch (error: any) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

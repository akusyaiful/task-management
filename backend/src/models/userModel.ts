import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../db";

export type DBUser = {
  user_id: number;
  name: string;
  username: string;
  password: string;
};

export async function createUser(
  name: string,
  username: string,
  password: string
): Promise<number | null> {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
      [name, username, password]
    );

    return result.insertId || null;
  } catch (error: any) {
    throw new Error(`Database error (createUser): ${error.message}`);
  }
}

export async function findUserByUsername(
  username: string
): Promise<DBUser | undefined> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    return rows[0] as DBUser | undefined;
  } catch (error: any) {
    throw new Error(`Database error (findUserByUsername): ${error.message}`);
  }
}

export async function findUserById(
  user_id: number
): Promise<DBUser | undefined> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE user_id = ?",
      [user_id]
    );
    return rows[0] as DBUser | undefined;
  } catch (error: any) {
    throw new Error(`Database error (findUserById): ${error.message}`);
  }
}

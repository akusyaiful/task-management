import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../db";
import { DBTask, TaskStatus } from "../types/Task";

export async function createTask(
  user_id: number,
  title: string,
  created_by: string,
  description?: string,
  status: TaskStatus = "To Do",
  deadline?: string
): Promise<number | null> {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO tasks (user_id, title, description, status, deadline, created_by) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, title, description, status, deadline, created_by]
    );

    return result.insertId || null;
  } catch (error: any) {
    throw new Error(`Database error (createTask): ${error.message}`);
  }
}

export async function getTaskByUser(
  user_id: number,
  status?: string,
  sort?: "asc" | "desc"
): Promise<DBTask[] | undefined> {
  try {
    let sql = "SELECT * FROM tasks WHERE user_id = ?";
    const params: any[] = [user_id];

    if (status) {
      sql += " AND status = ?";
      params.push(status);
    }

    if (sort) {
      sql += ` ORDER BY deadline ${
        sort.toUpperCase() === "ASC" ? "ASC" : "DESC"
      }`;
    } else {
      sql += " ORDER BY created_at DESC";
    }

    const [rows] = await pool.query<RowDataPacket[]>(sql, params);
    return rows as DBTask[] | undefined;
  } catch (error: any) {
    throw new Error(`Database error (getTaskByUser): ${error.message}`);
  }
}

export async function getTaskById(
  task_id: number
): Promise<DBTask | undefined> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM tasks WHERE task_id = ?",
      [task_id]
    );
    return rows[0] as DBTask | undefined;
  } catch (error: any) {
    throw new Error(`Database error (getTaskById): ${error.message}`);
  }
}

export async function updateTask(
  task_id: number,
  title: string,
  description: string,
  status: string,
  deadline: string,
  created_by: string
): Promise<boolean> {
  try {
    const fields: string[] = [];
    const params: any[] = [];

    if (title !== undefined) {
      fields.push("title = ?");
      params.push(title);
    }
    if (description !== undefined) {
      fields.push("description = ?");
      params.push(description);
    }
    if (status !== undefined) {
      fields.push("status = ?");
      params.push(status);
    }
    if (deadline !== undefined) {
      fields.push("deadline = ?");
      params.push(deadline);
    }
    if (created_by !== undefined) {
      fields.push("created_by = ?");
      params.push(created_by);
    }

    if (fields.length === 0) {
      return false;
    }

    params.push(task_id);
    const sql = `UPDATE tasks SET ${fields.join(", ")} WHERE task_id = ?`;
    const [result] = await pool.query<ResultSetHeader>(sql, params);
    return result.affectedRows > 0;
  } catch (error: any) {
    throw new Error(`Database error (updateTask): ${error.message}`);
  }
}

export async function deleteTask(task_id: number): Promise<boolean> {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM tasks WHERE task_id = ?",
      [task_id]
    );
    return result.affectedRows > 0;
  } catch (error: any) {
    throw new Error(`Database error (deleteTask): ${error.message}`);
  }
}

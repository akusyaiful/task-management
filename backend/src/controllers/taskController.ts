import { AuthRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import * as taskModel from "../models/taskModel";

export async function listTasks(req: AuthRequest, res: Response) {
  try {
    const user = req.user!;
    const { status, sort } = req.query;
    const tasks = await taskModel.getTaskByUser(
      user.user_id,
      status as string | undefined,
      (sort as "asc" | "desc") || undefined
    );

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No tasks found for this user",
        tasks: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error: any) {
    console.error("Get List Tasks Error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function getTask(req: AuthRequest, res: Response) {
  try {
    const user = req.user!;
    const id = Number(req.params.id);
    const task = await taskModel.getTaskById(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    if (task.user_id !== user.user_id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this task",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      task,
    });
  } catch (error: any) {
    console.error("Get Task Error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function createTask(req: AuthRequest, res: Response) {
  try {
    const user = req.user!;
    const { title, description, status, deadline } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const created_by = user.username;

    const taskId = await taskModel.createTask(
      user.user_id,
      title,
      description || "",
      status || "To Do",
      deadline,
      created_by
    );

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task_id: taskId,
    });
  } catch (error: any) {
    console.error("Create Task Error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function updateTask(req: AuthRequest, res: Response) {
  try {
    const { title, description, status, deadline } = req.body;
    const user = req.user;
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID format",
      });
    }

    const task = await taskModel.getTaskById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user_id !== user?.user_id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this task",
      });
    }

    const updated = await taskModel.updateTask(
      id,
      title,
      description,
      status,
      deadline,
      user.username
    );

    if (!updated) {
      return res.status(400).json({
        success: false,
        message: "Failed to update task",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error: any) {
    console.error("Update Task Error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function deleteTask(req: AuthRequest, res: Response) {
  try {
    const user = req.user!;
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID format",
      });
    }

    const task = await taskModel.getTaskById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user_id !== user?.user_id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this task",
      });
    }

    const deleted = await taskModel.deleteTask(id);
    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete task",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete Task Error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

import { useState } from "react";
import toast from "react-hot-toast";
import {
  createTaskService,
  deleteTaskService,
  getTasksService,
  updateTaskService,
} from "../service/taskService";
import type { Task, TaskStatus } from "../types/task";

interface ErrorResponse {
  message: string;
  success?: boolean;
}

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTasks = async (
    status: TaskStatus | "All" = "All",
    sort: "asc" | "desc" = "asc"
  ) => {
    setLoading(true);
    setError(null);

    try {
      const res = await getTasksService(
        status === "All" ? undefined : status,
        sort
      );
      if (res.success) {
        setTasks(res.tasks);
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      let message = "Server Error";
      if (typeof error === "object" && error !== null && "message" in error) {
        message = (error as ErrorResponse).message;
      }
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Partial<Task>) => {
    setLoading(true);
    setError(null);

    try {
      const res = await createTaskService(task);
      if (res.success) {
        toast.success(res.message);
        await getTasks();
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      let message = "Server Error";
      if (typeof error === "object" && error !== null && "message" in error) {
        message = (error as ErrorResponse).message;
      }
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: number, task: Partial<Task>) => {
    setLoading(true);
    setError(null);

    try {
      const res = await updateTaskService(id, task);
      if (res.success) {
        toast.success(res.message);
        await getTasks();
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      let message = "Server Error";
      if (typeof error === "object" && error !== null && "message" in error) {
        message = (error as ErrorResponse).message;
      }
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await deleteTaskService(id);
      if (res.success) {
        toast.success(res.message);
        await getTasks();
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      let message = "Server Error";
      if (typeof error === "object" && error !== null && "message" in error) {
        message = (error as ErrorResponse).message;
      }
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}

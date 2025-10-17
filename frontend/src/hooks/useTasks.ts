import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  createTaskService,
  deleteTaskService,
  getTasksService,
  updateTaskService,
} from "../service/taskService";
import type { Task, TaskStatus } from "../types/task";
import toast from "react-hot-toast";

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

      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
      setError(message);
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

      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
      setError(message);
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

      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
      setError(message);
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

      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

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

import type { Task, TaskStatus } from "../types/task";
import api from "./api";

export const getTasksService = (status?: TaskStatus, sort?: "asc" | "desc") =>
  api
    .get("/tasks", { params: { status, sort } })
    .then((res) => res.data.tasks as Task[]);

export const createTaskService = (task: Partial<Task>) =>
  api.post("/tasks", task).then((res) => res.data);

export const updateTaskService = (id: number, task: Partial<Task>) =>
  api.put(`/tasks/${id}`, task).then((res) => res.data);

export const deleteTaskService = (id: number) =>
  api.delete(`/tasks/${id}`).then((res) => res.data);

export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  task_id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  deadline?: string;
}

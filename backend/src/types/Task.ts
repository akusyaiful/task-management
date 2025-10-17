export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface DBTask {
  task_id: number;
  user_id: number;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string;
  created_at?: string;
  created_by: string;
  updated_at?: string;
}

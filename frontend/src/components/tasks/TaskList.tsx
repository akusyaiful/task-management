import type { Task, TaskStatus } from "../../types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-50 text-gray-500 text-lg">
        Tasks not found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {tasks.map((task) => (
        <TaskCard
          key={task.task_id}
          task_id={task.task_id}
          title={task.title}
          description={task.description}
          status={task.status as TaskStatus}
          deadline={task.deadline ?? undefined}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

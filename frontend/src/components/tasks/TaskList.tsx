import TaskCard from "./TaskCard";
import TaskFilterSort from "./TaskFilterSort";

const tasks = [
  {
    task_id: 3,
    user_id: 1,
    title: "Belajar TypeScript",
    description: "Mempelajari TypeScript dasar hingga lanjutan",
    status: "To Do",
    deadline: null,
    created_by: "syaiful",
    created_at: "2025-10-16T17:39:10.000Z",
    updated_at: "2025-10-16T17:39:10.000Z",
  },
  {
    task_id: 2,
    user_id: 1,
    title: "Belajar TypeScript",
    description:
      "Mempelajari TypeScript dasar hingga lanjutan Mempelajari TypeScript dasar hingga lanjutan Mempelajari TypeScript dasar hingga lanjutan Mempelajari TypeScript dasar hingga lanjutan Mempelajari TypeScript dasar hingga lanjutan",
    status: "Done",
    deadline: null,
    created_by: "syaiful",
    created_at: "2025-10-16T17:39:02.000Z",
    updated_at: "2025-10-16T17:39:52.000Z",
  },
  {
    task_id: 1,
    user_id: 1,
    title: "Belajar TS & Node",
    description: "Mempelajari TypeScript dasar hingga lanjutan",
    status: "Done",
    deadline: "2025-10-30T17:00:00.000Z",
    created_by: "syaiful",
    created_at: "2025-10-16T16:56:06.000Z",
    updated_at: "2025-10-16T17:04:28.000Z",
  },
];

export default function TaskList() {
  return (
    <div className="p-4">
      <TaskFilterSort />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {tasks.map((task) => (
          <TaskCard
            key={task.task_id}
            title={task.title}
            description={task.description}
            status={task.status as "To Do" | "In Progress" | "Done"}
            deadline={task.deadline ?? undefined}
          />
        ))}
      </div>
    </div>
  );
}

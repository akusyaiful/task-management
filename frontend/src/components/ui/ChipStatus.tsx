import type { TaskStatus } from "../../types/task";

interface ChipProps {
  status: TaskStatus;
}

const chipColor: Record<string, string> = {
  "To Do": "bg-gray-200 text-gray-800",
  "In Progress": "bg-yellow-200 text-yellow-800",
  Done: "bg-green-200 text-green-800",
};

export default function ChipStatus({ status }: ChipProps) {
  return (
    <div
      className={`px-2 py-1 rounded-lg text-sm font-semibold ${chipColor[status]}`}
    >
      {status}
    </div>
  );
}

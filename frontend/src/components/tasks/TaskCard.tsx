import { SquarePen, Trash } from "lucide-react";
import ChipStatus from "../ui/ChipStatus";

interface TaskCardProps {
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Done";
  deadline?: string;
}

export default function TaskCard({
  title,
  description,
  status,
  deadline,
}: TaskCardProps) {
  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between min-h-[200px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <ChipStatus status={status} />
      </div>
      {description && (
        <p className="text-gray-600 mb-2 overflow-hidden text-ellipsis text-left line-clamp-3">
          {description}
        </p>
      )}
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">Deadline: {deadline || "-"}</p>
        <div className="flex gap-4 justify-end">
          <SquarePen size={18} className="text-yellow-500" />
          <Trash size={18} className="text-red-500" />
        </div>
      </div>
    </div>
  );
}

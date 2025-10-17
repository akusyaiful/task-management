import { SquarePen, Trash } from "lucide-react";
import ChipStatus from "../ui/ChipStatus";
import type { Task } from "../../types/task";
import { format } from "date-fns";

interface TaskCardProps extends Task {
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({
  task_id,
  title,
  description,
  status,
  deadline,
  onEdit,
  onDelete,
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
        <p className="text-gray text-sm">
          Deadline: {deadline ? format(deadline, "dd-MM-yyyy") : "-"}
        </p>
        <div className="flex gap-4 justify-end">
          <button className="bg-yellow-400 rounded-full p-2">
            <SquarePen
              size={18}
              className="text-white text-bold"
              onClick={() =>
                onEdit({ task_id, title, description, status, deadline })
              }
            />
          </button>
          <button className="bg-red-500 rounded-full p-2">
            <Trash
              size={18}
              className="text-white"
              onClick={() => onDelete(task_id)}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

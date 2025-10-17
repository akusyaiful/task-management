import type { TaskStatus } from "../../types/task";

interface TaskFilterSortProps {
  status: TaskStatus | "All";
  sort: "asc" | "desc";
  onChangeStatus: (status: TaskStatus | "All") => void;
  onChangeSort: (sort: "asc" | "desc") => void;
}

export default function TaskFilterSort({
  status,
  sort,
  onChangeStatus,
  onChangeSort,
}: TaskFilterSortProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 items-start sm: items-center">
      <div>
        <label className="mr-2 font-semibold">Filter by status:</label>
        <select
          className="border rounded-lg p-1"
          value={status}
          onChange={(e) => onChangeStatus(e.target.value as TaskStatus | "All")}
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div>
        <label className="mr-2 font-semibold">Sort by deadline:</label>
        <select
          className="border rounded-lg p-1"
          value={sort}
          onChange={(e) => onChangeSort(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Earliest to Latest</option>
          <option value="desc">Latest to Earliest</option>
        </select>
      </div>
    </div>
  );
}

export default function TaskFilterSort() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 items-start sm: items-center">
      <div>
        <label className="mr-2 font-semibold">Filter by status:</label>
        <select className="border rounded-lg p-1">
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div>
        <label className="mr-2 font-semibold">Sort by deadline:</label>
        <select className="border rounded-lg p-1">
          <option value="asc">Earliest to Latest</option>
          <option value="desc">Latest to Earliest</option>
        </select>
      </div>
    </div>
  );
}

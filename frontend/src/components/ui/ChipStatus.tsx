interface ChipProps {
  status: "To Do" | "In Progress" | "Done";
}

const chipColor: Record<string, string> = {
  "To Do": "bg-gray-200 text-gray-800",
  "In Progress": "bg-yellow-200 text-yellow-800",
  Done: "bg-green-200 text-green-800",
};

export default function ChipStatus({ status }: ChipProps) {
  return (
    <div
      className={`px-2 py-1 rounded text-sm font-semibold ${chipColor[status]}`}
    >
      {status}
    </div>
  );
}

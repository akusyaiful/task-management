import React, { useEffect, useState } from "react";
import type { Task, TaskStatus } from "../../types/task";
import Input from "../ui/Input";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

interface TaskFormProps {
  task?: Partial<Task>;
  onSubmit: (task: Partial<Task>) => void;
  loading?: boolean;
}

export default function TaskForm({ task, onSubmit, loading }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<TaskStatus>(task?.status || "To Do");
  const [deadline, setDeadline] = useState<Date | null>(
    task?.deadline ? new Date(task.deadline) : null
  );

  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setStatus(task?.status || "To Do");
    setDeadline(task?.deadline ? new Date(task.deadline) : null);
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      status,
      deadline: deadline ? format(deadline, "yyyy-MM-dd") : undefined,
    });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="border p-2 rounded-lg mb-3 outline-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="border p-2 rounded-lg mb-3 outline-none"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progess</option>
        <option value="Done">Done</option>
      </select>
      <DatePicker
        selected={deadline}
        onChange={(date) => setDeadline(date)}
        className="border p-2 rounded-lg outline-none w-full mb-3"
        calendarClassName="rounded-lg border border-gray-300 shadow-lg"
        dayClassName={(date) =>
          date.toDateString() === new Date().toDateString()
            ? "bg-blue-500 text-white rounded-full"
            : "text-gray-700"
        }
        placeholderText="Select deadline"
        dateFormat="dd-MM-yyyy"
        minDate={new Date()}
      />
      <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold">
        {loading ? "Loading..." : task ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}

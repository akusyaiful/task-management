import { useEffect, useState } from "react";
import TaskList from "../../components/tasks/TaskList";
import useTasks from "../../hooks/useTasks";
import { type Task, type TaskStatus } from "../../types/task";
import { Plus } from "lucide-react";
import Modal from "../../components/ui/Modal";
import TaskForm from "../../components/forms/TaskForm";
import TaskFilterSort from "../../components/tasks/TaskFilterSort";

export default function TaskPage() {
  const {
    tasks,
    loading,
    error,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Partial<Task> | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    getTasks(statusFilter, sortOrder);
    // eslint-disable-next-line
  }, [statusFilter, sortOrder]);

  const openModal = (task?: Task) => {
    setSelectedTask(task || null);
    setModalOpen(true);
  };

  const handleSubmit = async (taskData: Partial<Task>) => {
    if (selectedTask?.task_id) {
      await updateTask(selectedTask.task_id, taskData);
    } else {
      await createTask(taskData);
    }
    setModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Tasks</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 font-semibold"
          onClick={() => openModal()}
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <TaskFilterSort
        status={statusFilter}
        sort={sortOrder}
        onChangeStatus={setStatusFilter}
        onChangeSort={setSortOrder}
      />

      {!loading && !error && (
        <TaskList tasks={tasks} onEdit={openModal} onDelete={deleteTask} />
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h1 className="text-xl font-bold mb-2">
          {selectedTask ? "Edit Task" : "Add Task"}
        </h1>
        <TaskForm task={selectedTask || undefined} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

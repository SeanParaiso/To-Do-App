import React, { useState } from "react";
import { Todo, Priority } from "../types";
import { Modal } from "./Modal";
import { FilterType } from "./Sidebar";
import { TaskModal } from "./TaskModal";
import { CalendarView } from "./CalendarView";
import { ProgressTracker } from "./ProgressTracker";

interface TodoListProps {
  filter: FilterType;
}

const priorityWeight = {
  high: 3,
  medium: 2,
  low: 1,
} as const;

export const TodoList: React.FC<TodoListProps> = ({ filter }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Todo | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCalendarView, setIsCalendarView] = useState(false);

  const handleAddTask = (data: {
    text: string;
    priority: Priority;
    dueDate: string;
    notes: string;
  }) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
        ...data,
      },
    ]);
  };

  const handleEditTask = (data: {
    text: string;
    priority: Priority;
    dueDate: string;
    notes: string;
  }) => {
    if (editingTask) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingTask.id ? { ...todo, ...data } : todo
        )
      );
      setEditingTask(null);
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingTask(todo);
    setShowTaskModal(true);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const confirmDelete = (id: number) => {
    setModalConfig({
      title: "Delete Task",
      message: "Are you sure you want to delete this task?",
      onConfirm: () => {
        setTodos(todos.filter((todo) => todo.id !== id));
        setShowModal(false);
      },
    });
    setShowModal(true);
  };

  const markAllDone = () => {
    setTodos(todos.map((todo) => ({ ...todo, completed: true })));
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
    }
  };

  const sortTodos = (todos: Todo[]) => {
    return [...todos].sort((a, b) => {
      // First, sort by priority
      const priorityDiff =
        priorityWeight[b.priority] - priorityWeight[a.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Then sort by due date (if exists)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      // Put tasks with due dates before tasks without due dates
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;

      // Finally, sort by creation date
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  };

  const filteredTodos = sortTodos(
    todos.filter((todo) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && todo.completed) ||
        (filter === "pending" && !todo.completed) ||
        (filter === "late" &&
          todo.dueDate &&
          new Date(todo.dueDate).getTime() < new Date().getTime());

      const matchesSearch = todo.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    })
  );

  const confirmDeleteAll = () => {
    setModalConfig({
      title: "Delete All Tasks",
      message:
        "Are you sure you want to delete all tasks? This cannot be undone.",
      onConfirm: () => {
        setTodos([]);
        setShowModal(false);
      },
    });
    setShowModal(true);
  };

  return (
    <>
      <div className="todo-container h-100 py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="page-header d-flex align-items-center mb-4">
              <h1 className="text-white mb-0">Task Manager</h1>

              <button
                className="btn btn-add-task"
                onClick={() => setShowTaskModal(true)}
              >
                <i className="fas fa-plus me-2"></i>
                Add Task
              </button>
            </div>
            <ProgressTracker todos={todos} />
            <div className="search-bar">
              <input
                type="text"
                className="form-control"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Move the toggle button here */}
            <div className="d-flex justify-content-between ">
              {todos.length > 0 && (
                <div className="action-buttons d-flex  mb-3">
                  <button className="btn btn-success" onClick={markAllDone}>
                    <i className="fas fa-check-double me-2"></i>
                    Mark All Done
                  </button>
                </div>
              )}
              <button
                className="btn btn-outline-secondary"
                onClick={() => setIsCalendarView(!isCalendarView)}
                aria-label={
                  isCalendarView
                    ? "Switch to List View"
                    : "Switch to Calendar View"
                }
              >
                <i
                  className={`fas ${
                    isCalendarView ? "fa-list" : "fa-calendar"
                  }`}
                ></i>
              </button>
            </div>

            {isCalendarView ? (
              <CalendarView todos={todos} filter={filter} />
            ) : (
              <>
                <div className="todo-list">
                  {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                      <div key={todo.id} className="todo-item card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center flex-wrap mb-2">
                            <div className="d-flex align-items-center flex-grow-1">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={todo.completed}
                                  onChange={() => toggleTodo(todo.id)}
                                  aria-label={`Mark "${todo.text}" as ${
                                    todo.completed ? "incomplete" : "complete"
                                  }`}
                                />
                              </div>
                              <span
                                className={`badge bg-${getPriorityColor(
                                  todo.priority
                                )} ms-2`}
                              >
                                {todo.priority}
                              </span>
                              <div className="ms-2">
                                <label
                                  className={`form-check-label mb-0 ${
                                    todo.completed
                                      ? "text-decoration-line-through"
                                      : ""
                                  }`}
                                >
                                  {todo.text}
                                </label>
                              </div>
                            </div>
                            <div className="btn-group ms-auto mt-2 mt-sm-0">
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => startEditing(todo)}
                                title="Edit task"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => confirmDelete(todo.id)}
                                title="Delete task"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          {(todo.dueDate || todo.notes) && (
                            <div className="task-details ms-4 ps-2">
                              {todo.dueDate && (
                                <div className="text-muted small mb-1">
                                  <i className="fas fa-calendar-alt me-2"></i>
                                  Due: {new Date(todo.dueDate).toLocaleString()}
                                </div>
                              )}
                              {todo.notes && (
                                <div className="text-muted small">
                                  <i className="fas fa-sticky-note me-2"></i>
                                  {todo.notes}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <div className="empty-state">
                        <i className="fas fa-clipboard-list mb-4"></i>
                        <h3 className="text-white mb-3">No tasks found</h3>
                        <p className="text-white-50 mb-4">
                          {todos.length === 0
                            ? "Get started by adding your first task!"
                            : `No tasks found in "${filter}" category.`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <TaskModal
        show={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        initialData={
          editingTask
            ? {
                text: editingTask.text,
                priority: editingTask.priority,
                dueDate: editingTask.dueDate,
                notes: editingTask.notes || "", // Convert undefined to empty string
              }
            : undefined
        }
        title={editingTask ? "Edit Task" : "Add New Task"}
      />

      <Modal
        show={showModal}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setShowModal(false)}
      />

      <button className="btn btn-outline-danger" onClick={confirmDeleteAll}>
        Delete All Tasks
      </button>
    </>
  );
};

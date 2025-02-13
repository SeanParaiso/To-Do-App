import React from "react";
import { Todo } from "../types";

interface CalendarViewProps {
  todos: Todo[];
  filter: string; // Accept filter type
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "rgba(244, 81, 44, 0.25)"; // Light red
    case "medium":
      return "rgba(255, 171, 64, 0.25)"; // Light orange
    case "low":
      return "rgba(139, 92, 246, 0.25)"; // Light purple
    default:
      return "rgba(255, 255, 255, 0.1)"; // Default background
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "high":
      return "fas fa-exclamation-circle"; // High priority icon
    case "medium":
      return "fas fa-exclamation-triangle"; // Medium priority icon
    case "low":
      return "fas fa-check-circle"; // Low priority icon
    default:
      return "fas fa-tasks"; // Default task icon
  }
};

export const CalendarView: React.FC<CalendarViewProps> = ({
  todos,
  filter,
}) => {
  // Filter todos based on the current filter
  const filteredTodos = todos.filter((todo) => {
    const isCompleted = todo.completed;
    const isLate =
      todo.dueDate && new Date(todo.dueDate).getTime() < new Date().getTime();

    switch (filter) {
      case "completed":
        return isCompleted;
      case "pending":
        return !isCompleted;
      case "late":
        return isLate;
      default:
        return true; // Show all tasks for "all" filter
    }
  });

  // Group filtered todos by date
  const groupedTodos = filteredTodos.reduce((acc, todo) => {
    const date = todo.dueDate
      ? new Date(todo.dueDate).toLocaleDateString()
      : "No date";
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  return (
    <div className="calendar-view">
      {Object.entries(groupedTodos).map(([date, tasks]) => (
        <div key={date} className="calendar-day">
          <h3 className="calendar-date">{date}</h3>
          <div className="task-grid">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="task-card"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              >
                <div className="d-flex align-items-center">
                  <i
                    className={`${getPriorityIcon(task.priority)} me-2`}
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                  <h4 className="task-title" style={{ fontSize: "1rem" }}>
                    {task.text}
                  </h4>
                </div>
                <p className="task-notes" style={{ fontSize: "0.8rem" }}>
                  {task.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

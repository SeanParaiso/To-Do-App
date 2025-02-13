import React from "react";
import { Todo } from "../types";

interface ProgressTrackerProps {
  todos: Todo[];
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ todos }) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="progress-tracker">
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: "#f4512c",
          }} // Customize color as needed
        ></div>
      </div>
      <div className="progress-text">
        {completedTasks} of {totalTasks} tasks completed
      </div>
    </div>
  );
};

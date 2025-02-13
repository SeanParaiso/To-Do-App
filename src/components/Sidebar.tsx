import React from "react";

export type FilterType = "all" | "pending" | "completed" | "late";

interface SidebarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
    late: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentFilter,
  onFilterChange,
  counts,
}) => {
  const filters: { type: FilterType; label: string; icon: string }[] = [
    { type: "all", label: "All Tasks", icon: "fas fa-layer-group" },
    { type: "pending", label: "Pending", icon: "fas fa-hourglass-half" },
    { type: "completed", label: "Completed", icon: "fas fa-check-circle" },
    { type: "late", label: "Late", icon: "fas fa-exclamation-circle" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h5 className="sidebar-heading">Task Lists</h5>
        <div className="nav flex-column">
          {filters.map(({ type, label, icon }) => (
            <button
              key={type}
              className={`nav-link sidebar-link ${
                currentFilter === type ? "active" : ""
              }`}
              onClick={() => onFilterChange(type)}
              title={label}
            >
              <i className={icon}></i>
              <span>{label}</span>
              {counts[type] > 0 && (
                <span className="badge ms-auto">{counts[type]}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

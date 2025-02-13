import React from "react";
import { Priority } from "../types";

interface TaskModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: {
    text: string;
    priority: Priority;
    dueDate: string;
    notes: string;
  }) => void;
  initialData?: {
    text: string;
    priority: Priority;
    dueDate: string;
    notes: string;
  };
  title: string;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  show,
  onClose,
  onSubmit,
  initialData,
  title,
}) => {
  const [text, setText] = React.useState(initialData?.text || "");
  const [priority, setPriority] = React.useState<Priority>(
    initialData?.priority || "medium"
  );
  const [dueDate, setDueDate] = React.useState(initialData?.dueDate || "");
  const [notes, setNotes] = React.useState(initialData?.notes || "");

  React.useEffect(() => {
    if (show) {
      setText(initialData?.text || "");
      setPriority(initialData?.priority || "medium");
      setDueDate(initialData?.dueDate || "");
      setNotes(initialData?.notes || "");
    }
  }, [show, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ text, priority, dueDate, notes });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="taskText" className="form-label">
                Task Description
              </label>
              <input
                id="taskText"
                type="text"
                className="form-control"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                required
              />
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="datetime-local"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="priority" className="form-label">
                  Priority
                </label>
                <select
                  id="priority"
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="notes" className="form-label">
                Notes (optional)
              </label>
              <textarea
                id="notes"
                className="form-control"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes..."
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

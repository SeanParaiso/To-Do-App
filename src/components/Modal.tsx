import React from "react";

interface ModalProps {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  show,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn btn-outline-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger ms-2" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

import React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="/logo.png"
            alt="Task Manager Logo"
            className="navbar-logo me-2"
          />
        </a>
      </div>
    </nav>
  );
};

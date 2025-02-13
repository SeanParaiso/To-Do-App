import "./styles/index.css";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { Navbar } from "./components/Navbar";
import { Sidebar, FilterType } from "./components/Sidebar";
import { useState } from "react";

function App() {
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");

  return (
    <div className="app-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          counts={{
            all: 0,
            pending: 0,
            completed: 0,
            late: 0,
          }}
        />
        <main className="main-content">
          <div className="container-fluid py-4">
            <TodoList filter={currentFilter} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

// Lavet af Fælles

import { useState, useEffect } from "react";
import "./App.scss";
import CreateTask from "./components/createTask/CreateTask";
import Tasks from "./components/tasks/Tasks";
import TopBar from "./components/topbar/TopBar";
import CompletedTasks from "./components/completedTasks/CompletedTasks";
import Footer from "./components/footer/Footer";
import FirstVisit from "./components/firstVisit/FirstVisit";
import Toolbar from "./components/toolbar/Toolbar";

function App() {
  const [view, setView] = useState("tasks");

  useEffect(() => {
    const savedActionColor = localStorage.getItem("actionColor") || "#A235D9";
    const savedHoverColor = localStorage.getItem("hoverColor") || "#8C31B9";

    document.documentElement.style.setProperty("--action", savedActionColor);
    document.documentElement.style.setProperty(
      "--action-hover",
      savedHoverColor
    );
  }, []);

  return (
    <div className="app">
      <FirstVisit />
      <header>
        <TopBar />
        <Toolbar setView={setView} view={view} />
      </header>
      <main>
        {view === "tasks" && <Tasks />}
        {view === "completed" && <CompletedTasks />}
      </main>
      <section>
        <CreateTask />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

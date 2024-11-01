import { useState } from "react";
import "./App.scss";
import CreateTask from "./components/createTask/CreateTask";
import FilterTasks from "./components/filterTasks/FilterTasks";
import Tasks from "./components/tasks/Tasks";
import TopBar from "./components/topbar/TopBar";
import CompletedTasks from "./components/completedTasks/CompletedTasks";
import Footer from "./components/footer/Footer";
import FirstVisit from "./components/firstVisit/FirstVisit";

function App() {
  const [view, setView] = useState("tasks");

  return (
    <div className="app">
      <FirstVisit />
      <header>
        <TopBar />
        <FilterTasks setView={setView} view={view} />
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

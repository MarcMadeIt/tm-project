import { useState } from "react";
import "./App.scss";
import CreateTask from "./components/createTask/CreateTask";
import FilterTasks from "./components/filterTasks/FilterTasks";
import Tasks from "./components/tasks/Tasks";
import TopBar from "./components/topbar/TopBar";
import PreviousTasks from "./components/previousTasks/PreviousTasks";
import Footer from "./components/footer/Footer";

function App() {
  const [view, setView] = useState("tasks");

  return (
    <div className="app">
      <header>
        <TopBar />
        <FilterTasks setView={setView} view={view} />
      </header>
      <main>
        {view === "tasks" && <Tasks />}
        {view === "previous" && <PreviousTasks />}
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

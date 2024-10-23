import "./App.scss";
import CreateTask from "./components/createTask/CreateTask";
import FilterTasks from "./components/filterTasks/FilterTasks";
import Tasks from "./components/tasks/Tasks";
import TopBar from "./components/topbar/TopBar";

function App() {
  return (
    <div className="app">
      <TopBar />
      <CreateTask />
      <FilterTasks />
      <Tasks />
    </div>
  );
}

export default App;

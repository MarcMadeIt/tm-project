import "./Toolbar.scss";
import Filter from "../filter/Filter";
import { useTasks } from "../../context/TasksContext";

interface Props {
  setView: (view: string) => void;
  view: string;
}

const Toolbar = ({ setView, view }: Props) => {
  const { setFilter } = useTasks();

  return (
    <div className="toolbar">
      <div className="left">
        <button
          className={`btn-light ${view === "tasks" ? "active" : ""}`}
          onClick={() => setView("tasks")}
        >
          My Tasks
        </button>
        <button
          className={`btn-light ${view === "completed" ? "active" : ""}`}
          onClick={() => setView("completed")}
        >
          Completed Tasks
        </button>
      </div>
      <div className="right">
        <Filter setFilter={setFilter} />
      </div>
    </div>
  );
};

export default Toolbar;

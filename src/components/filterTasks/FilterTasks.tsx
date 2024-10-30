import { MdFilterList } from "react-icons/md";
import "./FilterTasks.scss";

interface Props {
  setView: (view: string) => void;
  view: string;
}

const FilterTasks = ({ setView, view }: Props) => {
  return (
    <div className="filter-tasks">
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
        <span>Latest</span>
        <MdFilterList />
      </div>
    </div>
  );
};

export default FilterTasks;

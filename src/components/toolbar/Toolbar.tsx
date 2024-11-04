import "./Toolbar.scss";
import Filter from "../filter/Filter";

interface Props {
  setView: (view: string) => void;
  view: string;
}

const Toolbar = ({ setView, view }: Props) => {
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
        <Filter />
      </div>
    </div>
  );
};

export default Toolbar;

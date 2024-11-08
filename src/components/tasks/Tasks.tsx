import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useTasks } from "../../context/TasksContext";
import Task from "./task/Task";
import "./Tasks.scss";

const Tasks = () => {
  const { filterTasks } = useTasks();
  const filteredTasks = filterTasks();

  return (
    <div className="tasks">
      {filteredTasks.filter((task) => !task.completed).length > 0 ? (
        filteredTasks
          .filter((task) => !task.completed)
          .reverse()
          .map((task, index) => (
            <Task
              key={`${task.id}-${index}`}
              id={task.id}
              title={task.title}
              desc={task.desc}
              date={task.date}
              time={task.time}
              category={task.category}
              priority={task.priority}
              completed={task.completed}
            />
          ))
      ) : (
        <div className="notask">
          <h3>It looks a bit empty here!</h3>
          <p>
            Click <span className="notask-action">"New Task"</span> to get
            started.
          </p>
          <span className="notask-arrow">
            <MdOutlineKeyboardDoubleArrowDown />
          </span>
        </div>
      )}
    </div>
  );
};

export default Tasks;

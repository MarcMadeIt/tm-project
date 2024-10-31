import { useTasks } from "../../context/TasksContext";
import Task from "./task/Task";
import "./Tasks.scss";

const Tasks = () => {
  const { tasks } = useTasks();

  return (
    <div className="tasks">
      {tasks.length > 0 ? (
        [...tasks].reverse().map((task, index) => (
          <Task
            key={`${task.id}-${index}`} // Use the unique id as the key
            id={task.id} // Pass the id prop to Task component
            title={task.title}
            desc={task.desc}
            date={task.date}
            time={task.time}
            category={task.category}
            priority={task.priority}
          />
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default Tasks;

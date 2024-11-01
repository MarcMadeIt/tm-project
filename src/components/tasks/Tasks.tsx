import { useTasks } from "../../context/TasksContext";
import Task from "./task/Task";
import "./Tasks.scss";

const Tasks = () => {
  const { tasks } = useTasks();

  return (
    <div className="tasks">
      {tasks.filter((task) => !task.completed).length > 0 ? (
        tasks
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
        <p>No general tasks found.</p>
      )}
    </div>
  );
};

export default Tasks;

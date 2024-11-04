import { useTasks } from "../../context/TasksContext";
import CompletedTask from "./completedTask/CompletedTask";
import "./CompletedTasks.scss";

const CompletedTasks = () => {
  const { tasks } = useTasks();

  return (
    <div className="completed-tasks">
      {tasks.filter((task) => task.completed).length > 0 ? (
        tasks
          .filter((task) => task.completed)
          .reverse()
          .map((task, index) => (
            <CompletedTask
              key={`${task.id}-${index}`}
              id={task.id}
              title={task.title}
              desc={task.desc}
              date={task.date}
              time={task.time}
              category={task.category}
              completed={task.completed}
            />
          ))
      ) : (
        <p>No completed tasks found.</p>
      )}
    </div>
  );
};

export default CompletedTasks;

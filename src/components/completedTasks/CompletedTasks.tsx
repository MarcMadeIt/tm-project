import { useTasks } from "../../context/TasksContext";
import CompletedTask from "./completedTask/CompletedTask";

const CompletedTasks = () => {
  const { tasks } = useTasks();
  return (
    <div className="completed-tasks">
      {tasks.length > 0 ? (
        [...tasks]
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
            />
          ))
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default CompletedTasks;

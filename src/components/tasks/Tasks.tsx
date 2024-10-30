import { useState, useEffect } from "react";
import Task from "./task/Task";
import "./Tasks.scss";

interface TaskProps {
  title: string;
  description: string;
  deadline: string;
  category: string;
  priority: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    console.log("Saved tasks from localStorage:", savedTasks); // Log retrieved tasks
    if (Array.isArray(savedTasks)) {
      setTasks(savedTasks);
    } else {
      console.error("Tasks data is corrupted or not an array.");
    }
  }, []);
  return (
    <div className="tasks">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            description={task.description}
            deadline={task.deadline}
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

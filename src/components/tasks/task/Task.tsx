// Task.tsx
import "./Task.scss";

interface TaskProps {
  title: string;
  description: string;
  deadline: string;
  category: string;
  priority: string;
}

const Task = ({ title, description, deadline, category, priority }: TaskProps) => {
  return (
    <div className="task">
      <h4>{title}</h4>
      <p>{description}</p>
      <p>Deadline: {deadline}</p>
      <p>Category: {category}</p>
      <p>Priority: {priority}</p>
    </div>
  );
};

export default Task;

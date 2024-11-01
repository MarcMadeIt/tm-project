import {
  MdHealthAndSafety,
  MdHome,
  MdOutlineAccessTime,
  MdOutlineFamilyRestroom,
  MdRestore,
} from "react-icons/md";
import "./CompletedTask.scss";
import { useTasks } from "../../../context/TasksContext"; // Assuming a context is in place for task management

interface TaskProps {
  id: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  category: string;
  completed: boolean;
}

const CompletedTask = ({
  id,
  title,
  desc,
  date,
  time,
  category,
  completed,
}: TaskProps) => {
  const { toggleTaskCompletion } = useTasks(); // Use context to handle completion status

  const isoDateTime = new Date(`${date}T${time}`).toISOString();
  const formattedDate = new Date(date).toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleRestoreClick = () => {
    toggleTaskCompletion(id);
  };

  return (
    <div className="completed-task">
      <div className="completed-task-card">
        <div className="completed-task-top">
          <p className="deadline">
            <MdOutlineAccessTime />
            <time dateTime={isoDateTime}>
              {formattedDate} kl. {time}
            </time>
          </p>
        </div>
        <div className="completed-task-bottom">
          <p className="completed-task-cat">
            {category === "Home" && <MdHome />}
            {category === "Family" && <MdOutlineFamilyRestroom />}
            {category === "Health" && <MdHealthAndSafety />}
          </p>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>

        <span onClick={handleRestoreClick}>
          <MdRestore />
        </span>
      </div>
    </div>
  );
};

export default CompletedTask;

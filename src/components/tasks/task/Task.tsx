import "./Task.scss";

const Task = () => {
  return (
    <div className="task">
      <div className="task-card">
        <div className="top">Task 1</div>
        <div className="center">Content</div>
        <div className="bottom">
          <button>tryk</button>
        </div>
      </div>
      <div className="task-action">
        <span>Done</span>
        <span>Edit</span>
      </div>
    </div>
  );
};

export default Task;

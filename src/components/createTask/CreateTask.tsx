import { useState, useEffect, FormEvent } from "react";
import "./CreateTask.scss";
import { MdClose } from "react-icons/md";

// Define a Task interface
interface Task {
  title: string;
  description: string;
  deadline: string;
  category: string;
  priority: string;
}

const CreateTask = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Normal");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  const handleCreate = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: Task = { title, description, deadline, category, priority };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTitle("");
    setDescription("");
    setDeadline("");
    setCategory("");
    setPriority("Low");
    setOpen(false);
  };

  return (
    <div className="create-task">
      <button onClick={handleCreate} className="create-btn btn">
        New task
      </button>
      {open && (
        <div className="create-modal">
          <form onSubmit={handleAddTask}>
            <button
              type="button"
              className="create-close"
              onClick={handleClose}
            >
              <MdClose size={35} />
            </button>
            <h3>Create new Task</h3>
            <div className="create-item">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="inp"
                placeholder="Fx. Clean..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="create-item">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="inp"
                placeholder="Fx. the hall and the toilet..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="create-item">
              <label htmlFor="deadline">Deadline</label>
              <input
                type="date"
                className="inp"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className="create-item">
              <label htmlFor="category">What is it about?</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                <option value="high">High</option>
                <option value="middle">Middle</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="create-item">
              <label>How important is it?</label>
              <div className="create-radio-content">
                <div className="create-radio-item">
                  <label>Normal</label>
                  <input
                    type="radio"
                    value="Normal"
                    name="priority"
                    checked={priority === "Normal"}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </div>
                <div className="create-radio-item">
                  <label>Necessary</label>
                  <input
                    type="radio"
                    value="Necessary"
                    name="priority"
                    checked={priority === "Necessary"}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </div>
                <div className="create-radio-item">
                  <label>Urgent</label>
                  <input
                    type="radio"
                    value="Urgent"
                    name="priority"
                    checked={priority === "Urgent"}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn">
              Add Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTask;

import { useState } from "react";
import "./CreateTask.scss";
import { MdClose } from "react-icons/md";

const CreateTask = () => {
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="create-task">
      <button onClick={handleCreate} className="create-btn btn">
        New task
      </button>
      {open && (
        <div className="create-modal">
          <form action="">
            <button className="create-close">
              <MdClose onClick={handleClose} size={35} />
            </button>
            <h3>Create new Task</h3>
            <div className="create-item">
              <label htmlFor="">Title</label>
              <input type="text" className="inp" placeholder="Fx. Clean..." />
            </div>
            <div className="create-item">
              <label htmlFor="">Description</label>
              <input
                type="text"
                className="inp"
                placeholder="Fx. the hall and the toilet..."
              />
            </div>
            <div className="create-item">
              <label htmlFor="">Deadline</label>
              <input type="date" className="inp" />
            </div>
            <div className="create-item">
              <label htmlFor="">What is it about?</label>
              <select name="category" id="">
                <option value="" defaultChecked>
                  Choose Category
                </option>
                <option value="high">High</option>
                <option value="middle">Middle</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="create-item">
              <label htmlFor="">How important is it?</label>
              <div className="create-radio-content">
                <div className="create-radio-item">
                  <label htmlFor="">Normal</label>
                  <input
                    type="radio"
                    value="Low"
                    name="priority"
                    defaultChecked
                  />
                </div>
                <div className="create-radio-item">
                  <label htmlFor="">Necessary</label>
                  <input type="radio" value="Middle" name="priority" />
                </div>
                <div className="create-radio-item">
                  <label htmlFor="">Urgent</label>
                  <input type="radio" value="High" name="priority" />
                </div>
              </div>
            </div>
            <button className="btn">Add Task</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTask;

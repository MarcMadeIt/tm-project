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
        Create New task
      </button>
      {open && (
        <div className="create-modal">
          <span className="create-close">
            <MdClose onClick={handleClose} size={35} />
          </span>
          <form action="">
            <h3>Create new Task</h3>
            <div className="create-item">
              <label htmlFor="">Title</label>
              <input type="text" />
            </div>
            <div className="create-item">
              <label htmlFor="">Desc</label>
              <input type="text" />
            </div>
            <div className="create-item">
              <label htmlFor="">Deadline</label>
              <input type="date" />
            </div>
            <div className="create-item">
              <label htmlFor="">How important is it?</label>
              <select name="" id="">
                <option value="" defaultChecked></option>
                <option value="">High</option>
                <option value="">Middle</option>
                <option value="">Low</option>
              </select>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTask;

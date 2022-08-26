import "./task.css";
import { useContext, useState } from "react";
import TaskItem from "./TaskItem";
import EditTask from "./EditTask";
import { deleteData, getData, putData } from "./firebaseHandle";
import { Context } from "./UpdateContext";

function Task({ id, title, description, completed }) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });
  const ctx = useContext(Context);

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to toggle status */
  /* call when click checkbox */
  const handleChange = async () => {
    const data = await getData(id);
    const newData = { ...data, completed: !data.completed };
    const updatedData = JSON.stringify({
      title: newData.title,
      description: newData.description,
      completed: newData.completed,
    });
    putData(id, updatedData);
    // update the task list
    // just toggle status
    const updatedTask = [...ctx.tasks];
    const taskIndex = updatedTask.findIndex((task) => {
      return task.id === id;
    });
    updatedTask[taskIndex].completed = newData.completed;
    ctx.setTasksHandle(updatedTask);
  };

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    // update taskList in Context
    const updatedTask = ctx.tasks.filter((task) => {
      return task.id !== id;
    });
    //console.log(updatedTask);
    deleteData(id);
    ctx.setTasksHandle(updatedTask);
  };

  return (
    <div className={`task ${checked && "task--borderColor"}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          onChange={handleChange}
          type="checkbox"
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)}
        ></label>
      </div>
      <div className="task__body">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="task__buttons">
          <div className="task__deleteNedit">
            <button
              className="task__editButton"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit
            </button>
            <button className="task__deleteButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div>
      </div>

      {open.view && (
        <TaskItem
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditTask
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id}
        />
      )}
    </div>
  );
}

export default Task;

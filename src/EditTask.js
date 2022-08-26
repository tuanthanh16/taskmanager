import Modal from "./Modal";
import { useContext, useState } from "react";
import "./editTask.css";
import { putData } from "./firebaseHandle";
import { Context } from "./UpdateContext";

function EditTask({ open, onClose, toEditTitle, toEditDescription, id }) {
  const [title, setTitle] = useState(toEditTitle);
  const [description, setDescription] = useState(toEditDescription);
  // use Context here
  const ctx = useContext(Context);

  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedTask = [...ctx.tasks];
    /// update content of the id task
    const taskIndex = updatedTask.findIndex((task) => {
      return task.id === id;
    });
    const completedStatus = updatedTask[taskIndex].completed;
    const data = JSON.stringify({
      title: title,
      description: description,
      completed: completedStatus,
    });

    putData(id, data);
    /// update task list here

    const newData = {
      id: id,
      title: title,
      description: description,
      completed: completedStatus,
    };
    updatedTask[taskIndex] = newData;
    ctx.setTasksHandle(updatedTask);
    onClose();
  };

  // Update function using PUT method

  return (
    <Modal modalLable="Edit Task" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTask;

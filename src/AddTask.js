import Modal from "./Modal";
import { useContext, useState } from "react";
import "./addTask.css";
import "./firebaseHandle";
import { postData } from "./firebaseHandle";
import { Context } from "./UpdateContext";

function AddTask({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const ctx = useContext(Context);

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      title: title,
      description: description,
      completed: false,
    });

    const response = await postData(data);
    const newTask = {
      id: response["name"],
      title: title,
      description: description,
      completed: false,
    };
    console.log(response["name"], data);
    // update TaskList
    const updatedList = [...ctx.tasks, newTask];
    //console.log(updatedList);
    ctx.setTasksHandle(updatedList);

    onClose();
  };

  return (
    <Modal modalLable="Add Task" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="Enter title"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task decription"
          value={description}
        ></textarea>
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTask;

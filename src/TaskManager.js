import "./taskManager.css";
import Task from "./Task";
import { useState, useEffect, useContext } from "react";
import AddTask from "./AddTask";
import { Context } from "./UpdateContext";

const url =
  "https://movie-database-4me-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";

const TaskManager = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  // useContext here
  const ctx = useContext(Context);

  async function fetchTask() {
    const response = await fetch(url);
    const data = await response.json();
    const loadedTasks = [];
    for (const key in data) {
      loadedTasks.push({
        id: key,
        title: data[key].title,
        description: data[key].description,
        completed: data[key].completed,
      });
    }
    ctx.setTasksHandle(loadedTasks); // set State in Context
  }

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    //console.log("useEfect run");
    fetchTask();
  }, []);

  //console.log(ctx.tasks);
  return (
    <div className="taskManager">
      <header>Task Manager</header>
      <div className="taskManager__container">
        <button onClick={() => setOpenAddModal(true)}>Add task +</button>
        <div className="taskManager__tasks">
          {ctx.tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.completed}
              title={task.title}
              description={task.description}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
};

export default TaskManager;

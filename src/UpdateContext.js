import React, { useState } from "react";

export const Context = React.createContext();

const ContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const ctx = {
    tasks: tasks,
    setTasksHandle: setTasks,
  };
  return <Context.Provider value={ctx}>{props.children}</Context.Provider>;
};

export default ContextProvider;

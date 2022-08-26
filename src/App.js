import "./App.css";
import TaskManager from "./TaskManager";
import ContextProvider from "./UpdateContext";

function App() {
  return (
    <ContextProvider>
      <div className="app">
        <TaskManager />
      </div>
    </ContextProvider>
  );
}

export default App;

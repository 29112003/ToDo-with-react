import React, { useState, useEffect } from "react";
import Create from "./components/Create";
import DisplayTask from "./components/DisplayTask";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div className="bg-yellow-100 w-screen overflow-x-hidden h-screen pt-10 px-5 sm:px-10">
      <Create
        title={title}
        desc={desc}
        editingTask={editingTask}
        setTasks={setTasks}
        tasks={tasks}
        setTitle={setTitle}
        setDesc={setDesc}
      />

      <DisplayTask
        setTasks={setTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        tasks={tasks}
      />
    </div>
  );
};

export default App;

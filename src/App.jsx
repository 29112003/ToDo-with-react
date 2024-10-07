import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
          time: new Date().toLocaleTimeString(),
          day : new Date().toLocaleDateString('en-US', { weekday: 'long' })
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      title: capitalizeFirstLetter(title),
      desc: capitalizeFirstLetter(desc),
      completed: false,
      time: new Date().toLocaleTimeString() ,
      day : new Date().toLocaleDateString('en-US', { weekday: 'long' })
    };
    setTasks([...tasks, newTask]);
    clearFields();
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    
    // Confirm deletion only if the task is not completed
    if (!taskToDelete.completed || confirm("Are you sure you want to delete this task?")) {
        setTasks(tasks.filter((task) => task.id !== id));
    } else {
        alert("You cannot delete a completed task.");
    }
};


  const handleEditTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDesc(task.desc);
  };

  const handleUpdateTask = () => {
    const updatedTask = {
      ...editingTask,
      title: capitalizeFirstLetter(title),
      desc: capitalizeFirstLetter(desc),
      time: new Date().toLocaleTimeString(),
      day : new Date().toLocaleDateString('en-US', { weekday: 'long' })
    };
    setTasks(
      tasks.map((task) => (task.id === editingTask.id ? updatedTask : task))
    );
    clearFields();
    setEditingTask(null);
  };

  const clearFields = () => {
    setTitle("");
    setDesc("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || desc.trim() === "") {
      alert("Please fill in both the title and description.");
      return;
    }
    if (editingTask) {
      handleUpdateTask();
    } else {
      handleAddTask();
    }
  };
  const completedTasksCount = tasks.filter(task => task.completed).length;


  return (
    <div className="bg-yellow-100 w-screen h-screen pt-10 px-5 sm:px-10">
      <ProgressBar completedTasks={completedTasksCount} totalTasks={tasks.length} />

      <form onSubmit={submitHandler} className="max-w-lg mx-auto">
        <div className="flex flex-col gap-4 mb-6">
          <input
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 overflow-hidden overflow-wrap break-words whitespace-normal"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px] p-4 resize-none overflow-hidden overflow-wrap break-words"
            placeholder="Enter your task"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="bg-green-500 text-white text-xl py-2 rounded-lg shadow-md hover:bg-green-600 duration-200">
            {editingTask ? "Update Task" : "Submit"}
          </button>
        </div>
      </form>

      <div className="px-4 py-2 flex flex-wrap gap-4 justify-center">
        {tasks.length <= 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-48 bg-yellow-200 rounded-lg p-4 text-center shadow-md">
            <h2 className="font-bold text-xl mb-2">No Tasks Available</h2>
            <p className="text-gray-600 mb-4">
              It looks like you have no tasks. Start by adding a new task!
            </p>
          </div>
        ) : (
          tasks.map((task , index) => (
            <div
              key={task.id} // Use task.id as the unique key
              className={`transform transition-transform duration-300 hover:scale-105 w-full sm:w-[31%] p-6 rounded-lg shadow-xl flex flex-col items-start ${
                task.completed ? "bg-green-400" : "bg-yellow-300"
              }`}
            >
              <div className="flex items-center mb-4">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="mr-3 appearance-none h-6 w-6 border-2 border-white rounded-full checked:bg-blue-600 checked:border-transparent transition duration-300 cursor-pointer"
                ></button>

                <h1
                  className={`font-bold text-2xl overflow-hidden overflow-wrap break-words ${
                    task.completed
                      ? "line-through text-gray-600"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </h1>
              </div>
              <p className="text-gray-700 overflow-auto break-all mb-4">
                {task.desc}
              </p>
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md duration-200 hover:bg-red-700 transform transition-transform duration-300 hover:scale-105"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditTask(task)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md duration-200 hover:bg-blue-700 transform transition-transform duration-300 hover:scale-105"
                  >
                    Update
                  </button>
                </div>
                <p className="text-gray-500 italic text-sm"> {task.day} {task.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
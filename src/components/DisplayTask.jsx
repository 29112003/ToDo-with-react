import React, { useState, useEffect } from "react";


const DisplayTask = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const [filter, setFilter] = useState("all"); // Filter state

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
          time: new Date().toLocaleTimeString(),
          day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);

    // Confirm deletion only if the task is not completed
    if (
      taskToDelete.completed ||
      confirm("Are you sure you want to delete this task?")
    ) {
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

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // For 'all', return all tasks
  });

  return (
    <>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="incomplete">Incomplete Tasks</option>
        </select>
      </div>

      <div className="px-4 py-2 flex flex-wrap gap-4 justify-center">
        {filteredTasks.length <= 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-48 bg-yellow-200 rounded-lg p-4 text-center shadow-md">
            <h2 className="font-bold text-xl mb-2">No Tasks Available</h2>
            <p className="text-gray-600 mb-4">
              It looks like you have no tasks. Start by adding a new task!
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`transform transition-transform duration-300 hover:scale-105 w-full sm:w-[31%] p-6 rounded-lg shadow-xl flex flex-col items-start ${
                task.completed ? "bg-gray-400 opacity-1  " : "bg-yellow-300"
              }`}
            >
              <div className="flex items-center mb-4">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`mr-3 appearance-none h-7 w-7 border-2 border-white rounded-full checked:bg-blue-600 checked:border-transparent transition duration-300 cursor-pointer  ${
                    task.completed
                      ? "bg-green-400 opacity-1  "
                      : "bg-orange-600"
                  }`}
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
                <p className="text-gray-500 italic text-sm">
                  {" "}
                  {task.day} {task.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default DisplayTask;

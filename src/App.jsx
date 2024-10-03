import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const { register, handleSubmit } = useForm();
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: uuidv4(), ...newTask, completed: false }]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const submitHandler = (data) => {
    console.log("submitted");
    console.log(data);
    handleAddTask(data);
  };

  return (
    <div className="bg-yellow-100 w-screen h-screen pt-10 px-5 sm:px-20">
      <form onSubmit={handleSubmit(submitHandler)} className="max-w-lg mx-auto">
        <div className="flex flex-col gap-4 mb-6">
          <input
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("title", { required: { value: true, message: "Title must be filled" } })}
            type="text"
            placeholder="Enter title"
            name="title"
          />
          <textarea
            className="rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px] p-4 resize-none"
            {...register("desc", { required: { value: true, message: "Description must be filled" } })}
            name="desc"
            placeholder="Enter your task"
            id="desc"
          />
          <button className="bg-green-500 text-white text-xl py-2 rounded-lg shadow-md hover:bg-green-600 duration-200">
            Submit
          </button>
        </div>
      </form>

      <div className="px-4 py-2 flex flex-wrap gap-4 justify-center">
        {tasks.length <= 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-48 bg-yellow-200 rounded-lg p-4 text-center shadow-md">
            <h2 className="font-bold text-xl mb-2">No Tasks Available</h2>
            <p className="text-gray-600 mb-4">It looks like you have no tasks. Start by adding a new task!</p>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md duration-200 hover:bg-green-600"
              onClick={() => { /* Logic to open task creation form */ }}
            >
              Add New Task
            </button>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="bg-yellow-300 w-full sm:w-[30%] p-4 rounded-lg shadow-md flex flex-col items-start">
              <h1 className="font-bold text-lg">{task.title}</h1>
              <p className="text-gray-700 overflow-hidden whitespace-normal break-words max-h-20">
                {task.desc}
              </p>
              <div className="flex gap-2 mt-2">
                <button className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md duration-200 hover:bg-red-600" onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
                <button className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md duration-200 hover:bg-blue-600" onClick={() => handleEditTask(task)}>
                  Update
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;

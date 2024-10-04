import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      title: capitalizeFirstLetter(title),
      desc: capitalizeFirstLetter(desc),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    clearFields();
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
    };
    setTasks(tasks.map((task) => (task.id === editingTask.id ? updatedTask : task)));
    clearFields();
    setEditingTask(null);
  };

  const clearFields = () => {
    setTitle('');
    setDesc('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === '' || desc.trim() === '') {
      alert('Please fill in both the title and description.');
      return; 
    }
    if(title.trim() === ''){
      alert('Please fill  the title');
      return; 
    }
    if(desc.trim() === ''){
      alert('Please fill  the description.');
      return; 
    }
    if (editingTask) {
      handleUpdateTask();
    } else {
      handleAddTask();
    }
  };

  return (
    <div className="bg-yellow-100 w-screen h-screen pt-10 px-5 sm:px-10">
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
            {editingTask ? 'Update Task' : 'Submit'}
          </button>
        </div>
      </form>

      <div className="px-4 py-2 flex flex-wrap gap-4 justify-center">
        {tasks.length <= 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-48 bg-yellow-200 rounded-lg p-4 text-center shadow-md">
            <h2 className="font-bold text-xl mb-2">No Tasks Available</h2>
            <p className="text-gray-600 mb-4">It looks like you have no tasks. Start by adding a new task!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="bg-yellow-300 w-full sm:w-[31%] p-4 rounded-lg shadow-md flex flex-col items-start">
              <h1 className="font-bold text-lg overflow-hidden overflow-wrap break-words">{task.title}</h1>
              <p className="text-gray-700 overflow-auto break-all">
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

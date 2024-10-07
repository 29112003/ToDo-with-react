import React from 'react'
import { v4 as uuidv4 } from "uuid";

const Create = ({title , setTasks , tasks , setTitle , editingTask, setEditingTask , setDesc , desc}) => {


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


      const handleAddTask = () => {
        const newTask = {
          id: uuidv4(),
          title: capitalizeFirstLetter(title),
          desc: capitalizeFirstLetter(desc),
          completed: false,
          time: new Date().toLocaleTimeString(),
          day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        };
        setTasks([...tasks, newTask]);
        clearFields();
      };



      const handleUpdateTask = () => {
        const updatedTask = {
          ...editingTask,
          title: capitalizeFirstLetter(title),
          desc: capitalizeFirstLetter(desc),
          time: new Date().toLocaleTimeString(),
          day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        };
        setTasks(tasks.map((task) => (task.id === editingTask.id ? updatedTask : task)));
        clearFields();
        setEditingTask(null);
      };


      const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
    


      const clearFields = () => {
        setTitle("");
        setDesc("");
      };





  return (
    <>
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
    </>
  )
}

export default Create;

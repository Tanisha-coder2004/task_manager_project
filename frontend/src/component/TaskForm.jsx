import React from "react";
import { useState } from "react";
import { taskService } from "../services/taskService";
import "./TaskForm.css";
const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!title) return alert("Title zaroori hai!");
     const data =  await taskService.createTask(title, desc);
     if(data.success){
        setTitle("");
      setDesc("");
      onTaskAdded();
     }
      
    } catch (error) {
      alert(error.response?.data.message)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button className="add-btn" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

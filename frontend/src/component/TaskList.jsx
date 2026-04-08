
import React, { useState } from 'react';
import { taskService } from '../services/taskService';
import "./TaskList.css"

const TaskList = ({ tasks, onTaskDeleted, onTaskUpdated ,onTaskStats }) => {
  
  const [editingId, setEditingId] = useState(null);
  
  const [editFormData, setEditFormData] = useState({ title: "", description: "" });

  const [status,setStatus] = useState(false)

  const handleDelete = async (id) => {
    try {
      const data = await taskService.deleteTask(id);
      if(data.success){
         onTaskDeleted(); 
      }
    } catch (error) {
      alert(error.response?.data.message)
    }
    
    
  };

  // 1. Enter Edit Mode
  const handleEditClick = (task) => {
    setEditingId(task.id);
    setEditFormData({ title: task.title, description: task.description });
  };

  // 2. Save the Update
  const handleUpdate = async (id) => {
    try {
      // Call your API/Service
      await taskService.updateTask(id, editFormData.title, editFormData.description);
      setEditingId(null); // Exit edit mode
      onTaskUpdated();    // Refresh the list in parent component
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  const handleChangeStatus = async (id)=>{
    try {
      let taskStatus = await taskService.toggleTaskStatus(id);
      console.log(taskStatus)
      setStatus(taskStatus.task.completed)
      console.log(taskStatus.task.completed)
      onTaskStats()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='task-list-container'>
      <h3>Tasks List</h3>
      {tasks.map((task) => (
        <div key={task.id} style={{ padding: "10px"}} className='task-item-row'>
         
          {editingId === task.id ? (
           
            <div className="edit-mode-container">
              <input className='edit-input'
                value={editFormData.title} 
                onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
              />
              <textarea className='edit-desc'
                value={editFormData.description} 
                onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
              />
              <button className="save-btn" onClick={() => handleUpdate(task.id)}>Save</button>
              <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
           
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              
                <input type="checkbox" onClick={()=>handleChangeStatus(task.id)} className='marker' />
              
             
                <strong className='title'>{task.title}</strong>
                <p style={{ fontSize: "16px", color: "#666" }} className='description'>{task.description}</p>
              
              <div>
                <button onClick={() => handleEditClick(task)} className='btn-edit'>Edit</button>
                <button className='btn-delete'
                  onClick={() => handleDelete(task.id)} 
                  style={{ color: "red", marginLeft: "10px" }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
          
        </div>
      ))}
    </div>
  );
};

export default TaskList;
import React from "react";
import { useState,useEffect } from "react";
import { taskService } from "../services/taskService";
const useTask = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  const loadData = async () => {
    try {
      const data = await taskService.getAllTasks();
      setTasks(data.allTask || []);
      setStats(data.stats || { total: 0, completed: 0, pending: 0 });
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return {tasks,stats,refreshData:loadData};
};

export default useTask;

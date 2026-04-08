import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import StatCard from './component/StatCard'
import TaskForm from './component/TaskForm'
import TaskList from './component/TaskList'
import { useEffect} from 'react'
import {taskService} from "./services/taskService"

function App() {
  const [count, setCount] = useState(0)
 const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  const loadData = async () => {
    try {
      const data = await taskService.getAllTasks();
      setTasks(data.allTask || []);
      // Backend se jo stats aa rahe hain wo set karein
      setStats(data.stats || { total: 0, completed: 0, pending: 0 });
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    
      <div  className='main-dashboard'>
      <h1>Task Dashboard</h1>

      {/* --- Section 1: Stats Display --- */}
      <div  className='stats-row'>
        <StatCard label="Total" count={stats.total} color="#333" />
        <StatCard label="Completed" count={stats.completedTask} color="green" />
        <StatCard label="Pending" count={stats.pending} color="orange" />
      </div>

      {/* --- Section 2: Task Form --- */}
      <TaskForm onTaskAdded={loadData} />

      <hr />

      {/* --- Section 3: Task List --- */}
      <TaskList tasks={tasks} onTaskDeleted={loadData} onTaskUpdated={loadData} onTaskStats={loadData}/>
    </div>
  
  )
}

export default App

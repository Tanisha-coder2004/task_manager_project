
import './App.css'
import StatCard from './component/StatCard'
import TaskForm from './component/TaskForm'
import TaskList from './component/TaskList'
import useTask from "./hooks/useTask"

function App() {
  

const {tasks,stats,refreshData}= useTask();
  return (
    
      <div  className='main-dashboard'>
      <h1>Task Dashboard</h1>

      
      <div  className='stats-row'>
        <StatCard label="Total" count={stats.total} color="#333" />
        <StatCard label="Completed" count={stats.completedTask} color="green" />
        <StatCard label="Pending" count={stats.pending} color="orange" />
      </div>

     
      <TaskForm onTaskAdded={refreshData} />

      <hr />

     
      <TaskList tasks={tasks} onTaskDeleted={refreshData} onTaskUpdated={refreshData} onTaskStats={refreshData}/>
    </div>
  
  )
}

export default App

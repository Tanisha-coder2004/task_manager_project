import React from 'react'
import "./StatCard.css"
const StatCard = (props) => {
  return (
   <div className='card'>
    <h2>{props.count}</h2>
    <p>{props.label}</p>
  </div>
  )
}

export default StatCard
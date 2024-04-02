import React from 'react'

const Scoreboard = ({ score, bestScore }) => {
  return (
    <div className='scoreboard'>
      <h4>Current Score: {score}</h4>
      <h4>Best Score: {bestScore}</h4>
    </div>
  )
}

export default Scoreboard

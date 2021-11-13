import React from 'react'
import { useNavigate } from 'react-router-dom'

const TodoView = ({ todo }) => {
  const navigate = useNavigate()

  if (!todo) {
    return (
      <div className='view'>
        loading todo...
      </div>
    )
  }
  
  return (
    <div className='view'>
      <button onClick={() => navigate(-1)}>{'<'}</button>
      <h3>{todo.name}</h3>
      <p>{todo.deadline}</p>
      <p>{todo.description}</p>
      <div>done<input type='checkbox' checked={todo.status} /></div>
    </div>
  )
}

export default TodoView
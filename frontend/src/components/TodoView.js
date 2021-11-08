import React from 'react'

const TodoView = ({ todo }) => {
  if (!todo) {
    return (
      <div>
        loading todo...
      </div>
    )
  }
  
  return (
    <div>
      <h3>{todo.name}</h3>
      <p>{todo.deadline} {todo.status}</p>
      <p>{todo.description}</p>
    </div>
  )
}

export default TodoView
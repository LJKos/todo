import React from 'react'
import { Link, useParams } from 'react-router-dom'

const TodoView = ({ todo, editTodo }) => {
  const params = useParams()

  const handleEditTodo = () => {
    const changedTodo = {
      status: !todo.status
    }

    editTodo(todo.id, changedTodo)
  }

  if (!todo) {
    return (
      <div className='view'>
        loading todo...
      </div>
    )
  }

  return (
    <div className='view'>
      <div className='link'>
        <Link to={`/${params.list}`}>{`< ${params.list}`}</Link>
      </div>

      <h4>{todo.name}</h4>
      <div>{todo.description}</div>
      <div>{new Date(todo.deadline).toDateString()}</div>
      <div>done <input type='checkbox' defaultChecked={todo.status} onChange={() => handleEditTodo()} /></div>
    </div>
  )
}

export default TodoView
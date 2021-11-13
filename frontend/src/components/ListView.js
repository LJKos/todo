import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ListView = ({ list, addTodo, removeTodo }) => {
  const [showTodoForm, setShowTodoForm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [deadline, setDeadline] = useState('')

  const handleAddTodo = (event) => {
    event.preventDefault()

    addTodo(list.id, { name, description, status, deadline })

    setShowTodoForm(false)
    setName('')
    setDescription('')
    setStatus('')
    setDeadline('')
  }

  const handleRemoveTodo = (id) => {
    // keep handle function for adding functionality
    // 'do you want to remove the todo?' etc.
    removeTodo(list.id, id)
  }

  if (!list) {
    return (
      <div className='view'>
        loading list...
      </div>
    )
  }

  return (
    <div className='view'>
      <h4>{list.name}</h4>

      {showTodoForm &&
      <form onSubmit={handleAddTodo}>
        <div>
          name
          <input
            type='text'
            value={name}
            name='name'
            onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          description
          <input
            type='text'
            value={description}
            name='description'
            onChange={({ target }) => setDescription(target.value)} />
        </div>
        <div>
          status
          <input
            type='text'
            value={status}
            name='status'
            onChange={({ target }) => setStatus(target.value)} />
        </div>
        <div>
          deadline (yyyy-mm-dd or yyyy-mm-ddThh:mm:ss)
          <input
            type='text'
            value={deadline}
            name='deadline'
            onChange={({ target }) => setDeadline(target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>}
      <button onClick={() => setShowTodoForm(!showTodoForm)}>{showTodoForm ? 'cancel' : 'add todo'}</button>

      {list.todos.map(todo => <div key={todo.id}>
        <Link to={`/${list.name}/${todo.id}`}>{todo.name}</Link>
        <p>{todo.deadline} { todo.status ? 'done' : 'not done' }</p>
        <button onClick={() => handleRemoveTodo(todo.id)}>remove</button>
      </div>)}
    </div>
  )
}

export default ListView
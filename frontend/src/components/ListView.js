import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ListView = ({ list, addTodo, removeTodo, removeList }) => {
  const navigate = useNavigate()
  const [showTodoForm, setShowTodoForm] = useState(false)
  const [filter, setFilter] = useState('all')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState(new Date().toISOString().substring(0, 10))

  const handleAddTodo = (event) => {
    event.preventDefault()

    addTodo(list.id, { name, description, status: false, deadline })

    setShowTodoForm(false)
    setName('')
    setDescription('')
    setDeadline(new Date().toISOString().substring(0, 10))
  }

  const handleRemoveTodo = (todo) => {
    if (window.confirm(`Do you want to remove ${todo.name}?`)) {
      removeTodo(list.id, todo.id)
    }
  }

  const handleRemoveList = (list) => {
    if (window.confirm(`Do you want to remove ${list.name}?`)) {
      navigate('/')
      removeList(list.id)
    }
  }

  const handleChangeFilter = () => {
    if (filter === 'all') {
      setFilter('not done')
    } else if (filter === 'not done') {
      setFilter('done')
    } else {
      setFilter('all')
    }
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
      <h4>
        {list.name}
        <button onClick={() => handleRemoveList(list)}>remove this list</button>
      </h4>

      {showTodoForm &&
      <form onSubmit={handleAddTodo}>
        <div>
          <input
            type='text'
            placeholder='name'
            value={name}
            name='name'
            onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          <textarea
            placeholder='description (optional)'
            value={description}
            name='description'
            onChange={({ target }) => setDescription(target.value)}></textarea>
        </div>
        <div>
          <input
            type='date'
            value={deadline}
            name='deadline'
            onChange={({ target }) => setDeadline(target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>}
      <button onClick={() => setShowTodoForm(!showTodoForm)}>{showTodoForm ? 'cancel' : 'add todo'}</button>

      {!showTodoForm &&
      <div className='list'>
        <button onClick={() => handleChangeFilter()}>{filter}</button>

        {list.todos
          .filter(todo =>
            filter === 'done'
              ? todo.status
              : filter === 'not done'
                ? !todo.status
                : true
          )
          .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
          .map(todo => <div className='link' key={todo.id}>
          <Link to={`/${list.name}/${todo.id}`}>{todo.name}</Link>
          <button name='remove' onClick={() => handleRemoveTodo(todo)}>remove</button>
          <p>{new Date(todo.deadline).toDateString()} { todo.status ? '✔' : '✖' }</p>
        </div>)}
      </div>}
    </div>
  )
}

export default ListView
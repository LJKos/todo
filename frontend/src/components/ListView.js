import React from 'react'
import { Link } from 'react-router-dom'

const ListView = ({ list }) => {
  const addTodo = (event) => {
    event.preventDefault()
  }

  if (!list) {
    return (
      <div>
        loading list...
      </div>
    )
  }

  return (
    <div>
      <h4>{list.name}</h4>

      <form onSubmit={addTodo}>
        <div>
          name
          <input />
        </div>
        <div>
          description
          <input />
        </div>
        <div>
          status
          <input />
        </div>
        <div>
          deadline
          <input />
        </div>
        <button>add</button>
      </form>

      {list.todos.map(todo => <div key={todo.id}>
        <Link to={`/${list.name}/${todo.id}`}>{todo.name}</Link>
        <p>{todo.deadline} {todo.status}</p>
      </div>)}
    </div>
  )
}

export default ListView
import React from 'react'

const ListView = ({ list }) => {
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
      {list.todos.map(todo => <div key={todo.name}>
        <p>{todo.name}</p>
        <p>{todo.deadline} {todo.status}</p>
      </div>)}
    </div>
  )
}

export default ListView
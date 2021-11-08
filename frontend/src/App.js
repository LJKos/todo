import React, { useState } from 'react'

const todo_lists = [
  {
    name: "school",
    todos: [
      {
        id: 2,
        deadline: "2021-11-10 22:00",
        name: "assignment",
        description: "",
        status: "done!"
      },
      {
        id: 3,
        deadline: "2021-12-08 22:00",
        name: "final assignment",
        description: "Start this early!",
        status: "not done"
      }
    ]
  },
  {
    name: "work",
    todos: [
      {
        id: 1,
        deadline: "2021",
        name: "This App",
        description: "Finish this app and put it to Internet.",
        status: "not done"
      }
    ]
  }
]

const SidePanel = ({lists}) => {
  return (
    <div>
      <button>add list</button>
      <ul>
        {lists.map(list => <li>{list.name}</li>)}
      </ul>
    </div>
  )
}

const ListView = ({list}) => {
  return (
    <div>
      <h4>{list.name}</h4>
      {list.todos.map(todo => <div>
        <p>{todo.name}</p>
        <p>{todo.deadline} {todo.status}</p>
      </div>)}
    </div>
  )
}

const TodoView = ({todo}) => {
  return (
    <div>
      <h3>{todo.name}</h3>
      <p>{todo.deadline} {todo.status}</p>
      <p>{todo.description}</p>
    </div>
  )
}

const App = () => {
  const [lists, setLists] = useState(todo_lists)

  const addNewList = (name) => {
    const new_list = {
      name,
      todos: []
    }

    setLists(lists.concat(new_list))
  }

  return (
    <div>
      <h2>Todos</h2>
      <SidePanel lists={lists} />
      <TodoView todo={lists[1].todos[0]} />
      <ListView list={lists[0]} />
    </div>
  )
}

export default App

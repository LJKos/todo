import React, { useState, useEffect } from 'react'
import SidePanelView from './components/SidePanelView'
import ListView from './components/ListView'
import TodoView from './components/TodoView'

import todoService from './services/todos'

const App = () => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    todoService
      .getTodoLists()
      .then(lists => {
        setLists(lists)
      })
  }, [])

  return (
    <div>
      <h2>Todos</h2>
      <SidePanelView lists={lists} />
      <TodoView todo={lists && lists[1] && lists[1].todos[0]} />
      <ListView list={lists[0]} />
    </div>
  )
}

export default App

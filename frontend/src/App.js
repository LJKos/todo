import React, { useState, useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import SidePanelView from './components/SidePanelView'
import ListView from './components/ListView'
import TodoView from './components/TodoView'
import DefaultView from './components/DefaultView'

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

  const matchList = useMatch('/:list')
  const matchTodo = useMatch('/:list/:id')
  
  const list = matchList
    ? lists.find(list => list.name === matchList.params.list)
    : []
  
  const todo = matchTodo
    ? lists.find(list => list.name === matchTodo.params.list)
        .todos.find(todo => todo.id === matchTodo.params.id)
    : {}

  return (
    <div>
      <h2>Todos</h2>

      <SidePanelView lists={lists} />

      <Routes>
        <Route path="/:list/:id" element={<TodoView todo={todo} />} />
        <Route path="/:list" element={<ListView list={list} />} />
        <Route path="/" element={<DefaultView />} />
      </Routes>
    </div>
  )
}

export default App

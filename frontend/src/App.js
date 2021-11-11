import React, { useState, useEffect } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import SidePanelView from './components/SidePanelView'
import ListView from './components/ListView'
import TodoView from './components/TodoView'
import DefaultView from './components/DefaultView'
import LoginView from './components/LoginView'

import todoService from './services/todos'

const App = () => {
  const [user, setUser] = useState(null)
  const [lists, setLists] = useState([])

  let navigate = useNavigate()

  useEffect(() => {
    if (user) {
      todoService
        .getTodoLists()
        .then(todolists => {
          setLists(todolists.lists)
        })
    }
  }, [user])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      todoService.setToken(user.token)
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  const addList = (name) => {
    const found = lists.find(list => list.name === name)
    if (!found) {
      const newList = {
        name,
        todos: []
      }

      todoService
        .addList(newList)
        .then(lists => {
          setLists(lists)
        })
    }
  }

  const removeList = (id) => {
    todoService
      .removeList(id)
      .then(lists => {
        setLists(lists)
      })
  }

  const addTodo = (listId, todo) => {
    const deadline = new Date(todo.deadline)
    if (deadline) {
      const newTodo = {
        ...todo,
        deadline: deadline
      }

      todoService
        .addTodo(listId, newTodo)
        .then(lists => {
          setLists(lists)
        })
    }
  }

  const removeTodo = (listId, todoId) => {
    todoService
      .removeTodo(listId, todoId)
      .then(lists => {
        setLists(lists)
      })
  }

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

      <SidePanelView lists={lists} user={user} setUser={setUser} addList={addList} removeList={removeList} />

      <Routes>
        <Route path='/login' element={<LoginView setUser={setUser} />} />
        <Route path='/:list/:id' element={<TodoView todo={todo} />} />
        <Route path='/:list' element={<ListView list={list} addTodo={addTodo} removeTodo={removeTodo} />} />
        <Route path='/' element={<DefaultView addList={addList} />} />
      </Routes>
    </div>
  )
}

export default App

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
          setLists(todolists)
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
      navigate('/login', { replace: true })
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
        .then(list => {
          setLists(lists.concat(list))
        })
        .catch(() => {
          window.alert('Try different name. Must be at least one character.')
        })
    } else {
      window.alert(`List ${name} already exists!`)
    }
  }

  const removeList = (id) => {
    todoService
      .removeList(id)
      .then(() => {
        setLists(lists.filter(list => list.id !== id))
      })
  }

  const addTodo = (listId, todo) => {
    const deadline = new Date(todo.deadline)
    const newTodo = {
      ...todo,
      deadline: deadline
    }

    todoService
      .addTodo(listId, newTodo)
      .then(returnedTodo => {
        const updatedLists = lists.map(list => list.id === listId
          ? { ...list, todos: list.todos.concat(returnedTodo) }
          : list)
        setLists(updatedLists)
      })
      .catch(() => {
        window.alert('Todo must contain name and deadline in correct format.')
      })
  }

  const removeTodo = (listId, todoId) => {
    todoService
      .removeTodo(listId, todoId)
      .then(() => {
        const updatedLists = lists.map(list => list.id === listId
          ? { ...list, todos: list.todos.filter(todo => todo.id !== todoId) }
          : list)
        setLists(updatedLists)
      })
  }

  const editTodo = (todoId, changedTodo) => {
    todoService
      .editTodo(todoId, changedTodo)
      .then(updatedTodo => {
        const updatedLists = lists.map(list => list.id === updatedTodo.list
          ? { ...list, todos: list.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo) }
          : list)
        setLists(updatedLists)
      })
  }

  const matchList = useMatch('/:list')
  const matchTodo = useMatch('/:list/:id')
  
  const list = matchList
    ? lists.find(list => list.name === matchList.params.list)
    : []
  
  const todo = matchTodo && lists && lists.length > 0
    ? lists.find(list => list.name === matchTodo.params.list)
        .todos.find(todo => todo.id === matchTodo.params.id)
    : {}

  return (
    <div>
      <div className='header'>
        <h2>Todos</h2>
      </div>

      <div className='container'>
        <SidePanelView lists={lists} user={user} setUser={setUser} setLists={setLists} addList={addList} />

        <Routes>
          <Route path='/login' element={<LoginView setUser={setUser} />} />
          <Route path='/:list/:id' element={<TodoView todo={todo} editTodo={editTodo} />} />
          <Route path='/:list' element={<ListView list={list} addTodo={addTodo} removeTodo={removeTodo} removeList={removeList} />} />
          <Route path='/' element={<DefaultView addList={addList} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

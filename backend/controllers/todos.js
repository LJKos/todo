const todosRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const TodoList = require('../models/todolist')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

todosRouter.get('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = token ? jwt.verify(token, process.env.SECRET) : {}
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const lists = await TodoList.findOne({ user: decodedToken.id }).populate('user')
  response.json(lists)
})

todosRouter.put('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const userLists = await TodoList.findOne({ user: decodedToken.id })
  userLists.lists = userLists.lists.concat(body)
  const savedLists = await userLists.save()
  response.json(savedLists.lists)
})

todosRouter.put('/:list', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const userLists = await TodoList.findOne({ user: decodedToken.id })
  userLists.lists = userLists.lists.map(
    list => list._id.toString() === request.params.list
      ? { _id: list._id, name: list.name, todos: list.todos.concat(body) }
      : list
  )
  const savedLists = await userLists.save()
  response.json(savedLists.lists)
})

todosRouter.delete('/:list', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const userLists = await TodoList.findOne({ user: decodedToken.id })
  userLists.lists = userLists.lists.filter(list => list._id.toString() !== request.params.list)
  const savedLists = await userLists.save()
  response.json(savedLists.lists)
})

todosRouter.delete('/:list/:todo', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const userLists = await TodoList.findOne({ user: decodedToken.id })
  userLists.lists = userLists.lists.map(
    list => list._id.toString() === request.params.list
      ? { _id: list._id, name: list.name, todos: list.todos.filter(todo => todo._id.toString() !== request.params.todo) }
      : list
  )
  const savedLists = await userLists.save()
  response.json(savedLists.lists)
})

module.exports = todosRouter
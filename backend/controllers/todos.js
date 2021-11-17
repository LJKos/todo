const todosRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Todo = require('../models/todo')
const List = require('../models/list')

const getUserId = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (decodedToken.id) {
      return decodedToken.id
    }
  }

  return null
}

todosRouter.get('/', async (request, response) => {
  const userId = getUserId(request)
  if (!userId) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const lists = await List.find({ user: userId }).populate('todos')
  response.json(lists)
})

todosRouter.get('/lists', async (request, response) => {
  const userId = getUserId(request)
  if (!userId) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const lists = await List.find({ user: userId })
  response.json(lists)
})

todosRouter.get('/:list/todos', async (request, response) => {
  const listId = request.params.list
  const userId = getUserId(request)
  if (!userId) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const todos = await Todo.find({ user: userId, list: listId })
  response.json(todos)
})

todosRouter.get('/:todo', async (request, response) => {
  const todoId = request.params.todo
  const userId = getUserId(request)
  if (!userId) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const todo = await Todo.find({ user: userId, id: todoId })
  response.json(todo)
})

todosRouter.post('/', async (request, response) => {
  const body = request.body
  const userId = getUserId(request)
  if (!userId) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const list = new List({
    name: body.name,
    todos: [],
    user: userId
  })

  const savedList = await list.save()
  response.json(savedList.toJSON())
})

todosRouter.post('/:list', async (request, response) => {
  const body = request.body
  const listId = request.params.list
  const userId = getUserId(request)
  if (!userId) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const list = await List.findOne({ _id: listId })

  const todo = new Todo({
    deadline: new Date(body.deadline),
    name: body.name,
    description: body.description,
    status: body.status || false,
    user: userId,
    list: list._id
  })

  const savedTodo = await todo.save()
  list.todos = list.todos.concat(savedTodo._id)
  await list.save()

  response.json(savedTodo.toJSON())
})

todosRouter.put('/:todo', async (request, response) => {
  const body = request.body
  const todoId = request.params.todo
  const userId = getUserId(request)
  if (!userId) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const todo = {
    ...body
  }

  const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo, { new: true })
  response.json(updatedTodo)
})

todosRouter.delete('/:list', async (request, response) => {
  const listId = request.params.list
  const userId = getUserId(request)
  if (!userId) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  await Todo.deleteMany({ list: listId })
  await List.findByIdAndDelete(listId)
  response.status(204).end()
})

todosRouter.delete('/:list/:todo', async (request, response) => {
  const todoId = request.params.todo
  const userId = getUserId(request)
  if (!userId) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const list = await List.findOne({ todos: todoId })
  list.todos = list.todos.filter(todo => todo._id.toString() !== todoId)
  await list.save()

  await Todo.findByIdAndDelete(todoId)
  response.status(204).end()
})

module.exports = todosRouter
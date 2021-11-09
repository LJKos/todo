const todosRouter = require('express').Router()
const TodoList = require('../models/todo')

todosRouter.get('/', (request, response) => {
  TodoList.find({}).then(todoLists => {
    response.json(todoLists)
  })
})

todosRouter.get('/:list', (request, response) => {
  const listName = request.params.list
  TodoList.find({ name: listName }).then(todoList => {
    response.json(todoList)
  })
})

module.exports = todosRouter
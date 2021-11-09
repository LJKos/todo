const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const TodoList = require('../models/todolist')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash
  })

  const savedUser = await user.save()

  const initialTodoList = new TodoList({
    user: savedUser._id,
    lists: []
  })

  const savedTodoList = await initialTodoList.save()
  savedUser.todos = savedTodoList._id
  await savedUser.save()

  response.json(savedUser)
})

module.exports = usersRouter
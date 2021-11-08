require('dotenv').config()
const express = require('express')
const app = express()
const TodoList = require('./models/todo')
const cors = require('cors')

app.use(cors())

app.get('/', (request, response) => {
  response.send('<p>try: /api/todos</p>')
})

app.get('/api/todos', (request, response) => {
  TodoList.find({}).then(todoLists => {
    response.json(todoLists)
  })
})

app.get('/api/todos/:list', (request, response) => {
  const listName = request.params.list
  TodoList.find({ name: listName }).then(todoList => {
    response.json(todoList)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`)
})
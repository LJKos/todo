require('dotenv').config()
const express = require('express')
const app = express()
const TodoList = require('./models/todo')
const cors = require('cors')

app.use(cors())

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
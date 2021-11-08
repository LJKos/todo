const express = require('express')
const app = express()

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
  response.json(todo_lists)
})

app.get('/api/todos/:list', (request, response) => {
  const list_name = request.params.list
  const list = todo_lists.find(list => list.name == list_name)
  response.json(list)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`)
})
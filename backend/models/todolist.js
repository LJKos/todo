const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  deadline: Date,
  name: String,
  description: String,
  status: String
})

const listSchema = new mongoose.Schema({
  name: String,
  todos: [todoSchema]
})

const todoListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lists: [listSchema]
})

todoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

listSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

todoListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const TodoList = mongoose.model('TodoList', todoListSchema)

module.exports = TodoList
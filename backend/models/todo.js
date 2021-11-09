const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  deadline: Date,
  name: String,
  description: String,
  status: String
})

const todoListSchema = new mongoose.Schema({
  name: String,
  todos: [todoSchema]
})

todoSchema.set('toJSON', {
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

module.exports = mongoose.model('Todo', todoListSchema)
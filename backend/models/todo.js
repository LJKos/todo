const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  deadline: Date,
  name: {
    type: String,
    minlength: 1
  },
  description: String,
  status: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }
})

todoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Todo', todoSchema)
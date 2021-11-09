const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  todos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
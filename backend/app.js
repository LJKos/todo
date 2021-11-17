const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const history = require('connect-history-api-fallback')
const cors = require('cors')
const todosRouter = require('./controllers/todos')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
  .then(result => {
    console.log('successful MongoDB connection')
  })
  .catch((error) => {
    console.log('failed MongoDB connection:', error.message)
  })

app.use(cors())

if (config.NODE_ENV === 'production') {
  app.use(middleware.httpsRedirect)
}

app.use(history())

app.use(express.static('build'))
app.use(express.json())

app.use('/api/todos', todosRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
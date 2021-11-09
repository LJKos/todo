const todosRouter = require('express').Router()
const jwt = requir('jsonwebtoken')
const TodoList = require('../models/todolist')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

todosRouter.get('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }

  const lists = await TodoList.findOne({ user: decodedToken.id }).populate('user')
  response.json(lists)
})
/*
todosRouter.put('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'no valid token'
    })
  }


})

todosRouter.put('/:list', async (request, response) => {

})
*/

module.exports = todosRouter
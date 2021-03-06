import axios from 'axios'
const baseUrl = '/api/todos'

let bearer = null

const setToken = (token) => {
  bearer = `bearer ${token}`
}

const getTodoLists = async () => {
  const config = {
    headers: { Authorization: bearer }
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const addList = async (list) => {
  const config = {
    headers: { Authorization: bearer }
  }

  const response = await axios.post(baseUrl, list, config)
  return response.data
}

const removeList = async (listId) => {
  const config = {
    headers: { Authorization: bearer }
  }

  const response = await axios.delete(`${baseUrl}/${listId}`, config)
  return response.data
}

const addTodo = async (listId, todo) => {
  const config = {
    headers: { Authorization: bearer }
  }

  const response = await axios.post(`${baseUrl}/${listId}`, todo, config)
  return response.data
}

const removeTodo = async (listId, todoId) => {
  const config = {
    headers: { Authorization: bearer }
  }

  const response = await axios.delete(`${baseUrl}/${listId}/${todoId}`, config)
  return response.data
}

const editTodo = async (todoId, todo) => {
  const config = {
    headers: { Authorization: bearer }
  }

  const response = await axios.put(`${baseUrl}/${todoId}`, todo, config)
  return response.data
}

// eslint-disable-next-line
export default { setToken, getTodoLists, addList, removeList, addTodo, removeTodo, editTodo }
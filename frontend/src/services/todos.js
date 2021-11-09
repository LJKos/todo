import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/todos'

const getTodoLists = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// eslint-disable-next-line
export default { getTodoLists }
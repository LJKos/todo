import axios from 'axios'

const login = async (credentials) => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

const signin = async (credentials) => {
  const response = await axios.post('/api/users', credentials)
  return response.data
}

// eslint-disable-next-line
export default { login, signin }
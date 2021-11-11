import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/api/login`, credentials)
  return response.data
}

const signin = async (credentials) => {
  const response = await axios.post(`${baseUrl}/api/users`, credentials)
  return response.data
}

// eslint-disable-next-line
export default { login, signin }
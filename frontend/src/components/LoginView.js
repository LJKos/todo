import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import todoService from '../services/todos'

const LoginView = ({ setUser }) => {
  const [signin, setSignin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      
      todoService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      navigate('/')
    } catch (exception) {
      console.log('login failed')
    }
  }

  const handleSignin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.signin({
        username,
        password
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('signin failed')
    }
  }

  return (
    <div className='view'>
      <h3>{signin ? 'Sign in' : 'Log in'}</h3>
      {!signin && <p>Log in to use todo lists</p>}

      <form onSubmit={signin ? handleSignin : handleLogin}>
        <div>
          username
          <input
          type='text'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
          type='password'
          values={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>{signin ? 'sign in' : 'log in'}</button>
      </form>

      <button onClick={() => setSignin(!signin)}>{signin ? 'login' : 'sign-in'}</button>
    </div>
  )
}

export default LoginView
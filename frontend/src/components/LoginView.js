import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import todoService from '../services/todos'

const LoginView = ({ setUser }) => {
  const [signup, setSignup] = useState(false)
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

      navigate('/', { replace: true })
    } catch (exception) {
      window.alert('Log in failed!')
    }
  }

  const handleSignup = async (event) => {
    event.preventDefault()

    try {
      const newUser = await loginService.signin({
        username,
        password
      })

      if (newUser) {
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

        navigate('/', { replace: true })
      }
    } catch (exception) {
      window.alert('Sign in failed: try another username.')
    }
  }

  return (
    <div className='view'>
      <h3>{signup ? 'Sign up' : 'Log in'}</h3>

      <form onSubmit={signup ? handleSignup : handleLogin}>
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
        <button type='submit'>{signup ? 'sign up' : 'log in'}</button>
      </form>

      {!signup && <p>Create username and password</p>}
      <button onClick={() => setSignup(!signup)}>{signup ? 'back' : 'create profile'}</button>
    </div>
  )
}

export default LoginView
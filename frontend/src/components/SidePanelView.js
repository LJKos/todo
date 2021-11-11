import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const SidePanelView = ({ lists, user, setUser, addList, removeList }) => {
  const [name, setName] = useState('')
  let navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  const handleAddList = (event) => {
    event.preventDefault()

    addList(name)
    setName('')
  }

  const handleRemoveList = (id) => {
    // keep handle function for adding functionality
    // 'do you want to remove the list?' etc.
    removeList(id)
  }

  if (!user) {
    return null
  }

  if (!lists) {
    return (
      <div>
        loading lists...
      </div>
    )
  }
  
  return (
    <div>
      <button onClick={handleLogout}>log out</button>
      <button onClick={() => navigate('/')}>home</button>
      
      <form onSubmit={handleAddList}>
        <div>
            list name
            <input
            type='text'
            value={name}
            name='name'
            onChange={({ target }) => setName(target.value)} />
        </div>
        <button type='submit'>add list</button>
      </form>

      <ul>
        {lists.map(list => <li key={list.id}>
          <Link to={`/${list.name}`}>{list.name}</Link>
          <button onClick={() => handleRemoveList(list.id)}>remove</button>
        </li>)}
      </ul>
    </div>
  )
}

export default SidePanelView
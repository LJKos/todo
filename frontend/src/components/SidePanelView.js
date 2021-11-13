import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const SidePanelView = ({ lists, user, setUser, setLists, addList, removeList }) => {
  const [name, setName] = useState('')
  let navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    setLists([])
    navigate('/login')
  }

  const handleAddList = (event) => {
    event.preventDefault()

    addList(name)
    setName('')
  }

  const handleRemoveList = (id) => {
    navigate('/')
    
    removeList(id)
  }

  if (!user) {
    return (
      <div className='sidepanel'>
        <p>Log in to create lists</p>
      </div>
    )
  }

  if (!lists) {
    return (
      <div className='sidepanel'>
        loading lists...
      </div>
    )
  }
  
  return (
    <div className='sidepanel'>
      <button onClick={handleLogout}>log out</button>
      <button onClick={() => navigate('/')}>home</button>
      
      {false &&
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
      </form>}

      {lists.map(list => <div key={list.id}>
        <Link to={`/${list.name}`}>{list.name}</Link>
        <button onClick={() => handleRemoveList(list.id)}>-</button>
      </div>)}

      <button onClick={() => navigate('/')}>+</button>
    </div>
  )
}

export default SidePanelView
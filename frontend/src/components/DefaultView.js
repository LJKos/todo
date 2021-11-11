import React, { useState } from 'react'

const DefaultView = ({ addList }) => {
  const [name, setName] = useState('')

  const handleAddList = (event) => {
    event.preventDefault()

    addList(name)
    setName('')
  }

  return (
    <div>
      <h3>Add list</h3>
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
    </div>
  )
}

export default DefaultView
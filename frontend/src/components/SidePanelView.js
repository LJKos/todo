import React from 'react'
import { Link } from 'react-router-dom'

const SidePanelView = ({ lists }) => {
  if (!lists) {
    return (
      <div>
        loading lists...
      </div>
    )
  }
  
  return (
    <div>
      <button>add list</button>
      <ul>
        {lists.map(list => <li key={list.id}>
          <Link to={`/${list.name}`}>{list.name}</Link>
        </li>)}
      </ul>
    </div>
  )
}

export default SidePanelView
import React from 'react'

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
        {lists.map(list => <li key={list.name}>{list.name}</li>)}
      </ul>
    </div>
  )
}

export default SidePanelView
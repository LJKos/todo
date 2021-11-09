import React from 'react'

const DefaultView = () => {
  return (
    <div>
      <h3>Log in</h3>
      <p>Log in to use todo lists</p>
      <form>
        <div>username</div>
        <div>password</div>
        <button>log in</button>
      </form>
    </div>
  )
  /*return (
      <form>
          <div>
              list name
          </div>
          <input/>
          <button>add list</button>
      </form>
  )*/
}

export default DefaultView
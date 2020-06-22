import React from 'react'

export default props =>
  <form onSubmit={props.handleTodoSubmit} id="todoForm">
    <input
      type='text'
      value={props.currentTodo}
      onChange={props.handleNewTodoChange}
      autoFocus
      className="new-todo"
      placeholder="What needs to be done?"/>
  </form>

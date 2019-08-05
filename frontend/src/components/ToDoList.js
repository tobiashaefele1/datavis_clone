import React, {Component} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";


function ToDoList() {
     const todos = useStoreState(state => state.todos.items);
  const add = useStoreActions(actions => actions.todos.add);
  return (
    <div>
        {todos.map((todo, idx) => <div key={idx}>{todo}</div>)}
        <AddTodo onAdd={add} />
    </div>
)
}


export default ToDoList;
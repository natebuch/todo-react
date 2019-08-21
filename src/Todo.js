import React from 'react';

const Todo = ({ todo }) => { 
    return (
      <div>
        <p>TODO: { todo.name } </p>
        <p>Author: { `${todo.user_last_name}, ${todo.user_first_name[0]}.`} </p>
      </div>
    )  
}

export default Todo;
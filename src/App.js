import React, { Component } from 'react';
import axios from "axios";
import InputWidget from "./InputWidget";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { todos: [] }
  }
  
  componentDidMount() {
    axios.get("http://localhost:3000/todos.json").then((response) => {
      console.log(response)
      this.setState({ todos: response.data.todos })
    })
    console.log("asdf - componentDidMount")
  }


  render() {
    console.log("asdf - render")
    return (
      <div>
        <div>
          <h1>Web ToDo List</h1>
        </div>
          <InputWidget placeholder="New Todo"/>
        <div>
          <ul>
            { this.state.todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <h2>{ todo.name }</h2>
                  <button>Complete TODO</button>
                  <p>Author: { todo.user_first_name + ' ' + todo.user_last_name}</p>
                  { todo.comments.map((comment,index) => {
                    return ( 
                      <div key={ index }>  
                        <p>{ comment.text }</p>
                        <button>Like Comment</button>
                        <button>Dislike Comment</button>              
                      </div>
                    )}
                  )}
                  <InputWidget placeholder="New Comment"/>  
                </li>
              )}
            )}
          </ul>
        </div>
      </div>
    )
  }
}




export default App;


// Single input field for new todos

// Container showing existing todos

// Make table for like/disliked/agnostic

// Create a post action for todos, 



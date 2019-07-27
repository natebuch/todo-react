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
      this.setState({ todos: response.data.todos })
    })
    //console.log("asdf - componentDidMount")
  }

  pushResponse = (todo) => {
    this.state.todos.push(todo)
    this.setState({todos: this.state.todos})
    // set state at the end.  instatiate a variable to do all of the work on
  }

  render() {
    return (
      <div>
        <div>
          <h1>Web ToDo List</h1>
        </div>
          <InputWidget placeholder="New Todo" onInputResponse={ this.pushResponse }/>
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
                  <InputWidget placeholder="New Comment" />  
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


// cant map over user name from create



import React, { Component } from 'react';
import axios from "axios";
import InputWidget from "./InputWidget";
import InputComment from "./InputComment";



class App extends Component {
  constructor(props) {
    super(props)
    this.state = { todos: [] }
  }
  
  componentDidMount() {
    axios.get("http://localhost:3000/todos.json").then((response) => {
      this.setState({ todos: response.data.todos })
    })
  }

  pushResponse = (todo) => {
    let todos = Object.assign([], this.state.todos)
    todos.unshift(todo)
    this.setState({todos: todos})
    // set state at the end.  instatiate a variable to do all of the
  }

  commentResponse = () => {
    console.log("asdf")
  }

  completeTodo = (id) => {
    axios.patch(`http://localhost:3000/todos/${ id }.json`, { todo: { is_complete: true } }).then((response) => {
    console.log(response.data.todo)  
    let todos = this.state.todos
      todos.map((todo, index) => {
        if (todo.id === id) {
          todos[index] = response.data.todo
          return console.log(todo)
        } else return null
      }) 
      this.setState({todos: todos})
    })
    console.log(id)
  }
  // THis should become a button

  render() {
    return (
      <div>
        <div>
          <h1>Web ToDo List</h1>
        </div>
          <InputWidget placeholder="New Todo" onTodoInputResponse={ this.handleResponse }/>
        <div>
          <ul>
            { this.state.todos.map((todo) => {
              if (!todo.is_complete) {
                return (
                  <li key={todo.id}>
                    <h2>{ todo.name }</h2>
                    <button onClick={ () => this.completeTodo(todo.id) }>Complete TODO</button>
                    <p>Author: { todo.user_first_name + ' ' + todo.user_last_name }</p>
                    { todo.comments.map((comment,index) => {
                      return ( 
                        <div key={ index }>  
                          <p>{ comment.text }</p>
                          <button>Like Comment</button>
                          <button>Dislike Comment</button>              
                        </div>
                      )}
                    )}
                    <InputComment placeholder="New Comment" onCommentInputResponse= { this.commentResponse }/>  
                  </li>
                )} else return null
              } 
            )}
          </ul>
        </div>
      </div>
    )
  }
}




export default App;


// cant map over user name from create





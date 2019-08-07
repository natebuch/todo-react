import React, { Component } from 'react';
import axios from "axios";
import InputWidget from "./InputWidget";
import InputComment from "./InputComment";
import "./App.css";

const liked = 1
const disliked = 2
const likedStyle = {
  color: 'green'
}
const dislikedStyle = {
  color: 'red'
}

const agnosticStyle  = {
  color: 'black'
}

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

  pushResponseTodo = (todo) => {
    let todos = Object.assign([], this.state.todos)
    todos.unshift(todo)
    this.setState({todos: todos})
    // set state at the end.  instatiate a variable to do all of the
  }

  pushReponseComment = (comment) => {
    let commentedTodo = this.state.todos.filter(todo => comment.todo_id === todo.id)[0]
    commentedTodo.comments.unshift(comment)

    let todos = this.state.todos
      todos.map((todo, index) => {
        if (todo.id === comment.todo_id) {
          todos[index] = commentedTodo
        }
      })
      this.setState({todos: todos}) 
  }


  completeTodo = (id) => {
    axios.patch(`http://localhost:3000/todos/${ id }.json`, { todo: { is_complete: true } }).then((response) => {
    console.log(response.data.todo)  
    let todos = this.state.todos
      todos.map((todo, index) => {
        if (todo.id === id) {
          todos[index] = response.data.todo
        } 
      }) 
      this.setState({todos: todos})
    })
    return true
  }

  handleStatus = (status, id) => {  
    // IDentify what todo im on via response ... need to get posistion of the todo in the state
    // Identify the comment that is being updated on that todo via response ... need to get position of comment in todo comments
    axios.patch(`http://localhost:3000/comments/${ id }.json`, { comment: {status: status }}).then((response) => {  
      let todos = this.state.todos
      todos.map((todo) => {
        if (todo.id === response.data.comment.todo_id) {
          todo.comments.map((comment, index) => {
            if (comment.id === id) {
              todo.comments[index] = response.data.comment
            }
          })
        }
      })
    this.setState({ todos: todos })
    console.log(this.state)
    })
  }
  // HOW TO REFRESH ON LIKE?DISLIKE of comment

  render() {
    return (
      <div>
        <div>
          <h1>Web ToDo List</h1>
        </div>
          <InputWidget placeholder="New Todo" onTodoInput={ this.pushResponseTodo } />
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
                          <p className="comment" style={ comment.status === 'liked' ? likedStyle : comment.status === 'disliked' ? dislikedStyle : agnosticStyle }>{ comment.text }</p>
                          <button onClick={ () => this.handleStatus(liked, comment.id) }>Like Comment</button>
                          <button onClick={ () => this.handleStatus(disliked, comment.id) }>Dislike Comment</button>              
                        </div>
                      )}
                    )}
                    <InputComment placeholder="New Comment" onCommentInputResponse={ this.pushReponseComment } todoId={ todo.id }/>  
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





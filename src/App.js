import React, { Component } from 'react';
import axios from "axios";
import Todo from "./Todo";
import Comment from "./Comment";
import "./App.css";

const liked = 1
const disliked = 2

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      todos: [],
      todoInput: "",
      commentInput: ""  
    }
  }
  
  componentDidMount() {
    axios.get("http://localhost:3000/todos.json").then((response) => {
      let todos = response.data.todos.map((todo) => {
        return {
          ...todo,
          new_comment: ""
        }
      })
      console.log(todos)
      this.setState({ todos: todos })
    })
  }

  //

  handleTodoInput = (e) => {
    this.setState({ todoInput: e.target.value })
  }

  handleCommentInput = (e, index) => {
    let todos = this.state.todos
    let todo = this.state.todos[index]
    todo.new_comment = e.target.value
    todos[index] = todo
    this.setState({todos: todos})
  }

  pushResponseTodo = (todo) => {
    let todos = Object.assign([], this.state.todos)
    todos.unshift(todo)
    this.setState({todos: todos})
  }

  handleTodoCreate = () => {
    if (this.state.todoInput.length > 0) {
      axios.post("http://localhost:3000/todos.json", { todo: { name: this.state.todoInput, user_id: 1} }).then((response) => {
        this.pushResponseTodo(response.data.todo)
      })
      this.setState({ todoInput: ''})
    } else {
      window.alert("Todo cannot be empty")
    }
  }

  completeTodo = (id) => {
    axios.patch(`http://localhost:3000/todos/${ id }.json`, { todo: { is_complete: true } }).then((response) => {

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

  handleResponseComment = (comment) => {
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

  handleCommentCreate = (index) => {
    let todo = this.state.todos[index]
    let todos = this.state.todos
    if (todo.new_comment.length > 0) {
      axios.post(`http://localhost:3000/comments.json`, { comment: { text: todo.new_comment, todo_id: todo.id, user_id: 1} }).then((response) => {
        this.handleResponseComment(response.data.comment)
      })
      todo.new_comment = ""
      todos[index] = todo
      
      this.setState({todos: todos})
    } else {
      window.alert("Comment cannot be empty")
    }
  }

  handleStatus = (status, id) => {  
    // IDentify what todo im on via response ... need to get posistion of the todo in the state
    // Identify the comment that is being updated on that todo via response ... need to get position of comment in todo comments
    axios.patch(`http://localhost:3000/comments/${ id }.json`, { comment: {status: status }}).then((response) => {  
    let todos = this.state.todos
      todos.map((todo) => {
        if (todo.id === response.data.comment.todo_id) {
          todo.comments.map((comment, index) => {
            if (comment.id === response.data.comment.id) {
              todo.comments[index] = response.data.comment
            }
          })
        }  
      })
      this.setState({todos: todos})  
    })
  }

  
  render() {
    const { todos } = this.state

    let todoComments = (todo) => {
      return todo.comments.map(comment => {
        return (
          <div key={ comment.id }>
            <Comment comment={ comment } />
              <button onClick={ () => this.handleStatus(liked, comment.id) }>Like Comment</button>
              <button onClick={ () => this.handleStatus(disliked, comment.id) }>Dislike Comment</button> 
          </div>
        )
      })
    }

    let todosList = todos.map((todo, index) => {
      if (!todo.is_complete) {
        return (
          <div key={ todo.id }>
            <Todo todo={ todo }/>
            <input placeholder="Add new comment" onChange={ (e) => this.handleCommentInput(e, index) } value={ todo.new_comment } />
            <button onClick={ () => this.handleCommentCreate(index) }> + </button>
            { todoComments(todo) }
          </div>
        )
      } else return null
    })

    return (
      <div>
        <h1>Web ToDo List</h1>
          <input placeholder="Enter new todo" onChange={ this.handleTodoInput } value={ this.state.todoInput } ></input>
          <button onClick={ this.handleTodoCreate }> + TODO</button>
        <div>
          { todosList }
        </div>
      </div>
    )
  }
}




export default App;


// Need to clear input fields on submits - Need to identify the correct props for Comment - correct id for handleCommentCreate





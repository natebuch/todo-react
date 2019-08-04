import React, { Component } from 'react';
import axios from "axios";

class InputWidget extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }

  }

  // set the post action via axios to write the input
  

  handleCreate = () => {
    if (this.state.value.length > 0) {
      axios.post("http://localhost:3000/todos.json", { todo: { name: this.state.value, user_id: 1} }).then((response) => {
        this.handleResponse(response.data.todo)
      })
      this.setState({ value: ''})
    } else {
      window.alert("Todo cannot be empty")
    }
  }
 
  handleResponse = (todo) => {
    this.props.onTodoInput(todo)
  }
  
  handleInput = (e) => {
    this.setState({ value: e.target.value })
  }

  render() {
    return (
      <div>
        <input placeholder={ this.props.placeholder } value={ this.state.value } onChange={ this.handleInput }></input>
        <button onClick={ this.handleCreate } > + </button>
      </div>
    )  
  }
}

export default InputWidget;
import React, { Component } from 'react';
import axios from "axios";

class InputWidget extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }

  }

  // set the post action via axios to write the input
  
  handleCreate = () => {
    axios.post("http://localhost:3000/todos.json", { todo: { name: this.state.value, user_id: 1} }).then((response) => {
      this.handleResponse(response.data.todo)
    })
    this.setState({ value: ''})
  }
 
  handleResponse = (todo) => {
    this.props.onInputResponse(todo)
  }
  //new function to log response
  


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
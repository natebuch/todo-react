import React, { Component } from 'react';
import axios from "axios";
import { thisTypeAnnotation } from '@babel/types';

class InputWidget extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  // set the post action via axios to write the input
  
  handleCreate = () => {
    axios.post("http://localhost:3000/todos.json", { todo: { description: this.state.value} })
  }

  handleInput = (e) => {
    this.setState({ value: e.target.value })
    console.log(e.target.value)
  }

  render() {
    console.log("asdf - render")
    return (
      <div>
        <input placeholder={ this.props.placeholder } value={ this.state.value } onChange={ this.handleInput }></input>
        <button> + </button>
      </div>
    )  
  }
}

export default InputWidget;
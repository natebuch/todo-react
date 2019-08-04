import React, { Component } from 'react';
import axios from "axios";


class InputComment extends Component {
  constructor(props) {
    super(props)
    this.state = { value: ''} 
  }

  componentDidMount() {
    axios.get("http://localhost:3000/comments.json").then((response) => {
      this.setState({ comments: response.data.comments })
    })
  }

  // set the post action via axios to write the input

  
  handleCreate = () => {
    if (this.state.value.length > 0) {
      axios.post(`http://localhost:3000/comments.json`, { comment: { text: this.state.value, todo_id: this.props.todoId, user_id: 1} }).then((response) => {
        this.handleResponse(response.data.comment)
      })
      this.setState( { value: ''} )
    } else {
      window.alert("Comment cannot be empty")
    }
  }
 
  handleResponse = (comment) => {
    this.props.onCommentInputResponse(comment)

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

export default InputComment;
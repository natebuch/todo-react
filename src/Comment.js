import React from 'react';

const likedStyle = {
  color: 'green'
}
const dislikedStyle = {
  color: 'red'
}

const agnosticStyle  = {
  color: 'black'
}

const Comment = ({ comment }) => {
  return (
    <div>
      <p style={ comment.status === 'liked' ? likedStyle : comment.status === 'disliked' ? dislikedStyle : agnosticStyle }>{ comment.text }</p>
    </div>  
  )
}

export default Comment;
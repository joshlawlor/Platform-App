import React from 'react'
import './Message.css'
const Message = ({message}) => {
  return (
    <div>
        <div className='message'>
            <p class="message-content">{message.name}</p>
            <p>{message.text}</p>
        </div>

    </div>
  )
}

export default Message
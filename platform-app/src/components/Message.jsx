import React from 'react'
import { auth } from "../firebase";
import './Message.css'
const Message = ({message}) => {
  const messageAuthor = message.uid
  const messageClass = 
  messageAuthor === auth.currentUser.uid 
  ? `${'message-sent'}`
  : `${'message-received'}`
  return (
  
        <div className={`${messageClass}`}>
            <p class="message-content">{message.name}</p>
            <p>{message.text}</p>
        </div>

    
  )
}

export default Message
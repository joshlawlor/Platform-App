import React from 'react'
import './Rooms.css'
const Room = ({room}) => {
    
    const showMessages = () => {
            window.alert(room.id)
            //NEED TO PASS ROOM ID AND PATH TO CHATS/CHAT_ID TO CHAT COMPONENT
            //CHAT COMPONENT SHOULD SEARCH DB/CHATS/CHAT_ID/MESSAGES AND DISPLAY CURRENT ROOMS MESSAGES ONLY
    }
  return (
    <div className='rooms-container'>
        <div onClick={showMessages} className='room'>
            <p className='name'>{room.name}</p>
            <p>Owner: {room.owner}</p>
        </div>

    </div>
  )
}

export default Room
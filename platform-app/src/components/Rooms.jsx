import React from 'react'
import { useNavigate } from "react-router-dom";

import './Rooms.css'
import Chat from './Chat'
const Room = ({room}) => {
  const navigate = useNavigate()
    
    const showMessages = () => {
            //NEED TO PASS ROOM ID AND PATH TO CHATS/CHAT_ID TO CHAT COMPONENT
            //CHAT COMPONENT SHOULD SEARCH DB/CHATS/CHAT_ID/MESSAGES AND DISPLAY CURRENT ROOMS MESSAGES ONLY
            navigate('/chat/room', {state:{id: room.id, name: room.name}})
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
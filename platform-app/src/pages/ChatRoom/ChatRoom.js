import React from 'react'
import Navbar from '../Navbar/Navbar'
import { useLocation } from 'react-router-dom'
import Chat from '../../components/Chat'

const ChatRoom = () => {
    const location = useLocation()
    const roomID = location.state.id
    const roomName  = location.state.name
  return (
    <div>
        <Navbar></Navbar>
        <div>
            <h1>CHAT ROOM:{roomName}</h1>
            <Chat/>
        </div>
    </div>
  )
}

export default ChatRoom
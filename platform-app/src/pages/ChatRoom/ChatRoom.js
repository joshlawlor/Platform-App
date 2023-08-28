import React from 'react'
import Navbar from '../Navbar/Navbar'
import { useLocation } from 'react-router-dom'
import Chat from '../../components/Chat'
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatRoom = () => {
    const [chatUser] = useAuthState(auth);
    if (chatUser === null) {
        window.location.replace("/");
      }
    const location = useLocation()
    const roomID = location.state.id
    const roomName  = location.state.name
    
    
  return (
    <div>
        <Navbar></Navbar>
        <div>
            <h1>CHAT ROOM:{roomName}</h1>
                      {chatUser ? <Chat roomName={roomName} roomID={roomID}/> : null}

        </div>
    </div>
  )
}

export default ChatRoom
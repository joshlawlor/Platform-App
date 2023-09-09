import React from "react";
import './ChatPage.css'
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../service/AuthService";
import Chat from "../../components/Chat";
import CreateChat from "../../components/CreateChat";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatRooms } from "../../components/ChatRooms";
// import { GoogleAuthProvider , signInWithRedirect} from "firebase/auth";

function ChatPage() {
  const [chatUser] = useAuthState(auth);

  return (
    <div className="chat-page">
      <Navbar></Navbar>
      <div className="chat-page-container">
        <div className="chat-header">
          {chatUser ? <ChatRooms /> : <div>No Chat User Found</div>}
    <br/>
        {/* {chatUser ? `Hello ${chatUser.displayName}` :  <button>SIGN INTO CHAT</button>} */}
         
        
        </div>
        <div className="chat-content">
          {/* {chatUser ? <Chat/> : null} */}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

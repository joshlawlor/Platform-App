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

  if (getUser() === undefined || chatUser === null) {
    window.location.replace("/");
  }

  console.log(chatUser);

  // const chatSignIn = () => {
  //   const provider = new GoogleAuthProvider()
  //   signInWithRedirect(auth, provider);
  // }

  return (
    <div className="chat-page">
      <Navbar></Navbar>
      <div className="chat-page-container">
        <div className="chat-header">
      <ChatRooms/>
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

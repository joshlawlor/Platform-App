import React from "react";
import './ChatPage.css'
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../service/AuthService";
import Chat from "../../components/Chat";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider , signInWithRedirect} from "firebase/auth";

function ChatPage() {
  if (getUser() === undefined) {
    window.location.replace("/");
  }

  const [chatUser] = useAuthState(auth);
  console.log(chatUser);

  const chatSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider);
  }

  return (
    <div className="chat-page">
      <Navbar></Navbar>
      <div className="chat-page-container">
        <div className="chat-header">

        {chatUser ? `Hello ${chatUser.displayName}` :  <button onClick={chatSignIn}>SIGN INTO CHAT</button>}
         
        
        </div>
        <div className="chat-content">
          {chatUser ? <Chat/> : null}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

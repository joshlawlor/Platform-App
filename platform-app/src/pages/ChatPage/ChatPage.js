import React from "react";
import './ChatPage.css'
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../service/AuthService";

import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider , signInWithRedirect} from "firebase/auth";

function ChatPage() {
  if (getUser() == undefined) {
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
        <div className="chat-header">CHAT HEADER HERE
          <button onClick={chatSignIn}>SIGN INTO CHAT</button>
        
        </div>
        <div className="chat-content">CHAT CONTENT HERE
        
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

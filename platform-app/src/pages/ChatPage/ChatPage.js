import React from "react";
import './ChatPage.css'
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../service/AuthService";
import Chat from "../../components/Chat";
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

  const style = {
    chatContainer: `max-w-[728px] mx-auto text-center`,
    sectionContainer: `flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative`,
  };

  return (
    <div className={style.chatContainer}>
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
    </div>
  );
}

export default ChatPage;

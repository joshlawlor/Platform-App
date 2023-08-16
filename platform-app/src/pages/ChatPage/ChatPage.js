import React from "react";
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../service/AuthService";
function ChatPage() {
  if (getUser() == undefined) {
    console.log(getUser());
    console.log("NO USER");
    window.location.replace("/");
  }

  return (
    <div className="chat-page-container">
      <Navbar></Navbar>
      <div className="chat-page-header">CHAT HERE</div>
    </div>
  );
}

export default ChatPage;

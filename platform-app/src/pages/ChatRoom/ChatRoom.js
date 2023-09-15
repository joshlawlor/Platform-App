import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import Chat from "../../components/Chat";
import { auth, db } from "../../firebase";
import { doc, deleteDoc, updateDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatRoom = () => {
  const location = useLocation();
  const roomID = location.state.id;
  const roomName = location.state.name;
  const roomOwner = location.state.owner;
  const userList = location.state.userList;

  const [chatUser] = useAuthState(auth);

  return (
    <div>
      <Navbar></Navbar>
      <div>
        {chatUser ? <Chat roomName={roomName} roomID={roomID} roomOwner={roomOwner} userList={userList} /> : null}
      </div>
    </div>
  );
};

export default ChatRoom;

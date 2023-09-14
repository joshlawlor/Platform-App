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
  const [chatUser] = useAuthState(auth);
  const [isOwner, setIsOwner] = useState(null);
  // const [chatTitle, setChatTitle] = useState(roomName);
  const [showForm, setShowForm] = useState(false);
 

  useEffect(() => {
    if (chatUser === null) {
      window.location.replace("/");
    }

    if (roomOwner === chatUser.displayName) {
      setIsOwner(chatUser.displayName);
    }
  }, [chatUser]);

  const chatRoomRef = doc(collection(db, "chats"), roomID);
  const deleteChatRoom = async () => {
    try {
      await deleteDoc(chatRoomRef);
      window.location.replace("/chat");
    } catch (error) {
      console.error("Error deleting chat: ", error);
    }
  };
  const editRoomName = async () => {
    const newName = "EE";

    try {
      await updateDoc(chatRoomRef, {
        name: newName,
      });
    } catch (error) {
      console.error("Error editing chat: ", error);
    }
  };

  const openEditForm = () => {
    setShowForm(true);
  };

  const closeEditForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <h1>CHAT ROOM:UNKOWN</h1>
        {isOwner ? (
          <button onClick={deleteChatRoom} type="button">
            DELETE CHAT
          </button>
        ) : null}
        {isOwner ? (
          <button onClick={openEditForm} type="button">
            EDIT CHAT
          </button>
        ) : null}
        {showForm && (
          <div>
            <form>
              <button type="button" onClick={closeEditForm}>
                X
              </button>

              <label>New Room Name:</label>
              <input type="text" />
              <button type="button" onClick={editRoomName}>Save</button>
              <br />
            </form>
          </div>
        )}
        {chatUser ? <Chat roomName={roomName} roomID={roomID} /> : null}
      </div>
    </div>
  );
};

export default ChatRoom;

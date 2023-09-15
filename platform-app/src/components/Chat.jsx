import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import Message from "./Message";
import { auth, db } from "../firebase";
import {
  query,
  doc,
  collection,
  orderBy,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import SendMessage from "./SendMessage";

const Chat = ({ roomID, roomName, roomOwner, userList }) => {
  const [chatUser] = useAuthState(auth);
  const [isOwner, setIsOwner] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingRoomName, setEditingRoomName] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID;
  const algoliaApiKey = process.env.REACT_APP_ALGOLIA_API_KEY;
  const algoliasearch = require("algoliasearch");
  const client = algoliasearch(algoliaAppId, algoliaApiKey);
  const index = client.initIndex("dev_users");

  useEffect(() => {
    console.log(roomOwner);
    //THIS CHECKS IF CHAT USER IS THE OWNER (GIVES THEM EDITING POWER)
    if (roomOwner === chatUser.displayName) {
      setIsOwner(chatUser.displayName);
    }
    //THIS GRABS THE SPECIFIC ROOM DOC FROM THE CHATS COLLECTION
    const chatRoomRef = doc(collection(db, "chats"), roomID);
    //THIS GRABS THE SPECIFIC MESSAGES SUBCOLLECTION FROM THE ROOM DOC
    const messagesSubcollectionRef = collection(chatRoomRef, "Messages");

    const q = query(messagesSubcollectionRef, orderBy("timestamp"));
    console.log(q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [roomName, roomOwner, chatUser]);

  const chatRoomRef = doc(collection(db, "chats"), roomID);
  const deleteChatRoom = async () => {
    try {
      await deleteDoc(chatRoomRef);
      window.location.replace("/chat");
    } catch (error) {
      console.error("Error deleting chat: ", error);
    }
  };

  const handleRoomNameChange = (e) => {
    setNewRoomName(e.target.value);
  };

  const handleUserListChange = async (updatedList) => {
    try {
      await updateDoc(chatRoomRef, {
        userList: updatedList,
      });
      setShowForm(false);
      setRoomTitle(newRoomName);
      setEditingRoomName(false);
      // window.location.replace("/chat");
    } catch (error) {
      console.error("Error editing chat: ", error);
    }
  };

  const removeUserFromList = (userToRemove) => {
    const updatedList = userList.filter((user) => user !== userToRemove);
    handleUserListChange(updatedList);
  };

  const handleUserChange = (index, value) => {
    const updatedUserList = [...userList];
    console.log(updatedUserList);
    if (!updatedUserList.includes(value)) {
      // If it doesn't exist, add it to the end of the array
      updatedUserList.push(value);
      userListEdit(updatedUserList);
    }
  };

  const userListEdit = async (updatedUserList) => {
    try {
      await updateDoc(chatRoomRef, {
        userList: updatedUserList,
      });
      setShowForm(false);
      setEditingRoomName(false);
    } catch (error) {
      console.error("Error editing chat user list: ", error);
    }
  };

  const handleSearchInputChange = (e) => {
    //**NEED TO PUT A CHECK HERE IN CASE OF BLANK SEARCH */
    const value = e.target.value;
    setSearchInput(value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        searchUsers(value);
      }, 500)
    );
  };

  const searchUsers = (value) => {
    //THIS FUNCTION SEARCHES THE ALGOLIA INDEX OF USERS COLLECTION AND RETURNS WHAT MATCHES
    index
      .search(value)
      .then(({ hits }) => {
        console.log("USER SEARCH", hits);
        setSearchResults(hits);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editRoomName = async () => {
    try {
      await updateDoc(chatRoomRef, {
        name: newRoomName,
      });
      setShowForm(false);
      setRoomTitle(newRoomName);
      setEditingRoomName(false);
      // window.location.replace("/chat");
    } catch (error) {
      console.error("Error editing chat: ", error);
    }
  };

  const openEditForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className="chat-component-main">
        <div className="chat-edit-container">
          <h1>
            CHAT ROOM:{editingRoomName ? newRoomName : roomTitle || roomName}
          </h1>
          {isOwner ? (
            <button onClick={openEditForm} type="button">
              EDIT CHAT
            </button>
          ) : null}

          {showForm && (
            <div className="editForm-container">
              {/*  */}
              <form className="editForm">
                {/*  */}
                <div className="editBox">
                  <label>New Room Name:</label>
                  <input
                    type="text"
                    value={newRoomName}
                    onChange={handleRoomNameChange}
                  />
                  <button type="button" onClick={editRoomName}>
                    Edit Chat Name
                  </button>
                </div>
                {/*  */}
                <div className="editBox">
                  <div className="userSearch-container">
                    <label>Add a User:</label>
                    <input
                      value={searchInput}
                      onChange={(e) => handleSearchInputChange(e)}
                      type="text"
                      placeholder="Search for user to add (username)"
                    />
                    <div className="searchResults-container">
                      {searchResults.map((result, index) => (
                        <button
                          type="button"
                          key={result.objectID}
                          onClick={() =>
                            handleUserChange(index, result.username)
                          }
                        >
                          {result.username}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="editBox">
                  <label>User List:</label>
                  <div id="userList-container">
                    {userList.map((user, index) =>
                      user !== roomOwner ? (
                        <div key={index}>
                          {user}
                          <button
                            type="button"
                            onClick={() => removeUserFromList(user)}
                          >
                            X
                          </button>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
                {/*  */}
                <div className="editBox">
                  {isOwner ? (
                    <button onClick={deleteChatRoom} type="button">
                      DELETE CHAT
                    </button>
                  ) : null}
                </div>
              </form>
            </div>
          )}
        </div>
        <br />
        <div className="messages-container">
          {messages &&
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
        </div>
      </div>
      <SendMessage scroll={scroll} roomID={roomID} />
      {/* Send Message Component */}
      <span ref={scroll}></span>
    </>
  );
};

export default Chat;

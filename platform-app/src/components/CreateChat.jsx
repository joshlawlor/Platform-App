import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
  createId,
} from "firebase/firestore";

const CreateChat = () => {
  const [input, setInput] = useState("");
  const [userList, setUserList] = useState([""]);

  const handleAddUser = () => {
    setUserList([...userList, ""]);
  };

  const handleUserChange = (index, value) => {
    const updatedUserList = [...userList];
    updatedUserList[index] = value;
    setUserList(updatedUserList);
  };

  const createChat = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid chat name");
      return;
    }
    const { uid, displayName } = auth.currentUser;

    //THIS IS THE ROUTE TO THE CHAT COLLECTION
    const chatCollectionRef = collection(db, "chats");

    const chatDocRef = doc(chatCollectionRef);

    await setDoc(chatDocRef, {
      name: input,
      owner: displayName,
      uid,
      timestamp: serverTimestamp(),
    });

    //THIS IS THE ROUTE TO CREATE A USERS SUBCOLLECTION INSIDE THE CHAT DOCMENT

    const usersSubCollectionRef = collection(chatDocRef, "Users");

    await addDoc(usersSubCollectionRef, {
      text: "User List:",
      users: userList,
      timestamp: serverTimestamp(),
    });

    //THIS IS THE ROUTE TO CREATE A MESSAGES SUBCOLLECTION INSIDE THE CHAT DOCMENT

    const messagesSubcollectionRef = collection(chatDocRef, "Messages");

    await addDoc(messagesSubcollectionRef, {
      text: "Chat Created",
      timestamp: serverTimestamp(),
    });

    setInput("");
    setUserList([""]);
  };

  return (
    <form onSubmit={createChat}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Chat Name"
      />

      {userList.map((user, index) => (
        <input
          key={index}
          value={user}
          onChange={(e) => handleUserChange(index, e.target.value)}
          type="text"
          placeholder="Add User (1 at a time)"
        />
      ))}

      <button type="button" onClick={handleAddUser}>Add User</button> 
        <br/>
        <br/>
      <button type="submit">Create a New Chat</button>
    </form>
  );
};

export default CreateChat;

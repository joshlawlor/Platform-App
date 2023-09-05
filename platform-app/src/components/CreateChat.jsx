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


//ALGOLA EXTENSIONS 
//THIS EXTENSION INDEXES THE USERS COLLECTION IN FIRESTORE
const algoliasearch = require('algoliasearch');
const client = algoliasearch("MWZ58POI5N", "7f34a82ecad5e5b864407f07815b9260");
const index = client.initIndex('dev_users');


//THIS FUNCTION SEARCHES THE ALGOLIA INDEX OF USERS COLLECTION AND RETURNS WHAT MATCHES
index.search('a')
.then(({hits}) => {
  console.log(hits);
})
.catch(err => {
  console.log(err);
})


const CreateChat = () => {
  const { uid, displayName } = auth.currentUser;
  const [input, setInput] = useState("");
  const [userList, setUserList] = useState([""]);

  const handleAddUser = () => {
    setUserList([...userList, ""]);
  };

  const handleUserChange = (index, value) => {
    const updatedUserList = [...userList]
    updatedUserList[index] = value;
    setUserList([...updatedUserList]);
  };

  const createChat = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid chat name");
      return;
    }

    //THIS IS THE ROUTE TO THE CHAT COLLECTION
    const chatCollectionRef = collection(db, "chats");

    const chatDocRef = doc(chatCollectionRef);

    const finalUsers = [displayName, ...userList]
    await setDoc(chatDocRef, {
      name: input,
      owner: displayName,
      userList: finalUsers,
      uid,
      timestamp: serverTimestamp(),
    });

    //THIS IS THE ROUTE TO CREATE A USERS SUBCOLLECTION INSIDE THE CHAT DOCMENT, THEN A DOCUMENT NAMED USER LIST INTO THE USERS SUBCOLLECTION

    // const userlistDocRef = doc(collection(chatDocRef, "Users"), "USER LIST");

    // await setDoc(userlistDocRef, {
    //   users: userList,
    //   timestamp: serverTimestamp(),
    // });

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

      <button type="button" onClick={handleAddUser}>
        Add User
      </button>
      <br />
      <br />
      <button type="submit">Create a New Chat</button>
    </form>
  );
};

export default CreateChat;

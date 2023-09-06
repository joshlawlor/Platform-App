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
const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID
const algoliaApiKey = process.env.REACT_APP_ALGOLIA_API_KEY
const algoliasearch = require('algoliasearch');
const client = algoliasearch(algoliaAppId, algoliaApiKey);
const index = client.initIndex('dev_users');

const CreateChat = () => {
  const { uid, displayName } = auth.currentUser;
  const [input, setInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [userList, setUserList] = useState([""]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

 
const handleSearchInputChange = (e) => {
  const value = e.target.value;
  setSearchInput(value);
  if(searchTimeout) {
    clearTimeout(searchTimeout);
  }

  setSearchTimeout(
    setTimeout(() => {
      searchUsers(value)
    }, 500)
  );
}

const searchUsers = (value) => {
 //THIS FUNCTION SEARCHES THE ALGOLIA INDEX OF USERS COLLECTION AND RETURNS WHAT MATCHES
 index.search(value)
 .then(({hits}) => {
   console.log('USER SEARCH',hits);
   setSearchResults(hits);
 })
 .catch(err => {
   console.log(err);
 })
 
}

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
      <input
        value={searchInput}
        onChange={(e) => handleSearchInputChange(e)}
        type="text"
        placeholder="Search for user (username)"
      />
       {searchResults.map((result) => (
        <button
          key={result.objectID}
          onClick={() => handleUserChange(userList.length, result.username)}
        >
          {result.username}
        </button>
      ))}

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
